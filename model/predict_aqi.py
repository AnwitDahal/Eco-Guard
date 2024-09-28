import os
import sys
from pymongo import MongoClient, errors
from dotenv import load_dotenv
from datetime import datetime, timedelta
import numpy as np
from sklearn.preprocessing import MinMaxScaler
from tensorflow.keras.models import load_model
import json

# Load environment variables from the .env file
load_dotenv()

# Get MongoDB URI from the environment variable
mongo_uri = os.getenv("MONGO_URI")

# MongoDB connection setup (optional since we are not using it anymore)
try:
    client = MongoClient(mongo_uri)
    db = client['test']  # Correct database name
    collection = db['predicted_aqi']  # Collection to store forecasted AQI (not used anymore)
    print("Connected to MongoDB successfully")
except errors.ConnectionError as e:
    print(f"Failed to connect to MongoDB: {e}")
    exit(1)
except errors.PyMongoError as e:
    print(f"Failed to retrieve server information: {e}")
    exit(1)

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

# Main function to predict AQI from input JSON
def predict_aqi_from_json(json_input, range_diff=5):
    model = load_model("C:/Users/nm_ma/Desktop/Eco-Guard/model/best_model.keras")

    district = json_input["district"]
    data = json_input["data"]
    
    last_week_data = []
    last_date = None
    for record in data:
        aqi_details = record["details"]
        last_week_data.append([
            aqi_details["Pm2.5"],
            aqi_details["Pm10"],
            aqi_details["No2"],
            aqi_details["So2"],
            aqi_details["Co"],
            aqi_details["O3"],
            aqi_details["overall_aqi"]
        ])
        last_date = record["date"]  
    
    last_week_data = np.array(last_week_data)
    scaler = MinMaxScaler()
    scaled_data = scaler.fit_transform(last_week_data)

    next_week_aqi = forecast_next_week_aqi(model, scaler, scaled_data)
    next_week_dates = get_next_week_dates(last_date)

    result = {
        "district": district,
        "next_week_forecast": []
    }
    
    for i in range(7):
        predicted_aqi = next_week_aqi[i]
        low_aqi = max(predicted_aqi - range_diff, 0)  
        high_aqi = predicted_aqi + range_diff

        result["next_week_forecast"].append({
            "date": next_week_dates[i]["date"].strftime("%Y-%m-%d"),
            "day": next_week_dates[i]["day"],
            "predicted_aqi": round(predicted_aqi, 2),
            "low_aqi": round(low_aqi, 2),
            "high_aqi": round(high_aqi, 2)
        })

    return json.dumps(result)  # Return the result as a JSON string

# Main entry point
if __name__ == "__main__":
    input_json = sys.argv[1]  # Read input JSON from command-line arguments
    json_input = json.loads(input_json)  # Parse JSON string
    output_json = predict_aqi_from_json(json_input)  # Get the JSON response
    print(output_json)  # Print the output JSON to stdout
