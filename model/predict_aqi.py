import os
import numpy as np
from flask import Flask, jsonify
from pymongo import MongoClient, errors
from dotenv import load_dotenv
from datetime import datetime, timedelta
from sklearn.preprocessing import MinMaxScaler
from tensorflow.keras.models import load_model

# Load environment variables from the .env file
load_dotenv()

# Initialize Flask app
app = Flask(__name__)

# Get MongoDB URI from the environment variable
mongo_uri = os.getenv("MONGO_URI")

# MongoDB connection setup
try:
    client = MongoClient(mongo_uri)
    db = client['test']  # Correct database name
    collection = db['predicted_aqi']  # Collection to store forecasted AQI
    last_aqi_collection = db['last_aqi']  # Collection to retrieve last week's data
    print("Connected to MongoDB successfully")
except errors.ConnectionError as e:
    print(f"Failed to connect to MongoDB: {e}")
    exit(1)
except errors.PyMongoError as e:
    print(f"Failed to retrieve server information: {e}")
    exit(1)

# Load your trained model once
model = load_model("C:/Users/nm_ma/Desktop/Eco-Guard/model/best_model.keras")

# Function to forecast the next week's AQI
def forecast_next_week_aqi(model, scaler, last_week_data, time_step=7):
    last_week_data = last_week_data.reshape(1, time_step, last_week_data.shape[1])
    next_week_forecast = []

    for _ in range(7):
        next_day_pred = model.predict(last_week_data)
        next_week_forecast.append(next_day_pred[0, 0])

        new_input = np.zeros((1, time_step, last_week_data.shape[2]))
        new_input[:, :-1, :] = last_week_data[:, 1:, :]
        new_input[:, -1, -1] = next_day_pred
        last_week_data = new_input

    temp_next_week = np.zeros((7, last_week_data.shape[2]))
    temp_next_week[:, -1] = next_week_forecast
    next_week_forecast_original = scaler.inverse_transform(temp_next_week)
    next_week_forecast_original = next_week_forecast_original[:, -1]

    return next_week_forecast_original

# Function to get the next week's date and day
def get_next_week_dates(last_date):
    next_week_dates = []
    for i in range(1, 8):
        next_date = last_date + timedelta(days=i)
        next_day_name = next_date.strftime("%A")
        next_week_dates.append({"date": next_date, "day": next_day_name})
    return next_week_dates

# Route to predict AQI for all districts
@app.route('/predict_aqi_for_all_districts', methods=['GET'])
def predict_aqi_for_all_districts():
    try:
        # Get distinct districts from last_aqi collection
        districts = last_aqi_collection.distinct('district')
        if not districts:
            return jsonify({"error": "No districts found in the database."}), 404

        results = []
        
        # Loop over each district
        for district in districts:
            # Fetch the last 7 days of AQI data for the district
            last_week_data = last_aqi_collection.find_one({"district": district})

            # Check if data exists
            if not last_week_data or "data" not in last_week_data or len(last_week_data["data"]) < 7:
                print(f"Not enough data for district: {district}")
                continue  # Skip districts with less than 7 days of data

            processed_data = []
            last_date = None

            # Loop through the data array
            for record in last_week_data["data"]:
                processed_data.append([
                    record["details"]["Pm2.5"],
                    record["details"]["Pm10"],
                    record["details"]["No2"],
                    record["details"]["So2"],
                    record["details"]["Co"],
                    record["details"]["O3"],
                    record["details"]["overall_aqi"]
                ])
                last_date = datetime.strptime(record["date"], "%Y-%m-%d")  # Ensure correct date format

            last_week_data_array = np.array(processed_data)
            scaler = MinMaxScaler()
            scaled_data = scaler.fit_transform(last_week_data_array)

            next_week_aqi = forecast_next_week_aqi(model, scaler, scaled_data)
            next_week_dates = get_next_week_dates(last_date)

            result = {
                "district": district,
                "next_week_forecast": []
            }

            for i in range(7):
                predicted_aqi = next_week_aqi[i]
                low_aqi = max(predicted_aqi - 5, 0)  # Adjust low_aqi range
                high_aqi = predicted_aqi + 5

                result["next_week_forecast"].append({
                    "date": next_week_dates[i]["date"].strftime("%Y-%m-%d"),
                    "day": next_week_dates[i]["day"],
                    "predicted_aqi": round(predicted_aqi, 2),
                    "low_aqi": round(low_aqi, 2),
                    "high_aqi": round(high_aqi, 2)
                })

            # Store the result in MongoDB
            update_result = collection.update_one(
                {"district": district},
                {"$set": result},
                upsert=True
            )
            
            if update_result.matched_count > 0:
                print(f"Updated the existing record for district: {district}")
            else:
                print(f"Inserted new record for district: {district}")

            results.append(result)

        return jsonify({"results": results}), 200

    except errors.PyMongoError as e:
        print(f"Failed to fetch data from MongoDB: {e}")
        return jsonify({"error": "Failed to fetch data from MongoDB."}), 500

# Main entry point
if __name__ == "__main__":
    app.run(debug=True)
