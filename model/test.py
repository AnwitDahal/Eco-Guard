import numpy as np
from sklearn.preprocessing import MinMaxScaler
from tensorflow.keras.models import load_model

# Dummy data for PM2.5, PM10, NO2, SO2, CO, O3, and AQI values for the last week
# Replace these values with your actual data for testing
dummy_data = np.array([
    [50, 30, 20, 10, 0.5, 25, 100],
    [55, 35, 25, 15, 0.6, 30, 110],
    [60, 40, 30, 20, 0.7, 35, 120],
    [65, 45, 35, 25, 0.8, 40, 130],
    [70, 50, 40, 30, 0.9, 45, 140],
    [75, 55, 45, 35, 1.0, 50, 150],
    [80, 60, 50, 40, 1.1, 55, 160]
])

# Function to forecast the next week's AQI using the saved LSTM model
def forecast_next_week_aqi(model, scaler, last_week_data, time_step=7):
    """
    Function to predict AQI for the next 7 days based on the last week's data.

    Parameters:
    - model: Trained LSTM model loaded from disk.
    - scaler: Fitted MinMaxScaler used to scale the data.
    - last_week_data: Last 7 days of AQI-related data as a NumPy array (scaled).
    - time_step: Number of time steps used for prediction (default is 7 days).

    Returns:
    - next_week_forecast_original: Predicted AQI values for the next 7 days (in original scale).
    """
    # Reshape last week's data to [1, time_step, number_of_features] for LSTM prediction
    last_week_data = last_week_data.reshape(1, time_step, last_week_data.shape[1])

    # Placeholder to store next week's predictions
    next_week_forecast = []

    for _ in range(7):  # Predicting for the next 7 days
        # Predict AQI for the next day
        next_day_pred = model.predict(last_week_data)

        # Append the predicted AQI (assumed AQI is the last feature in the dataset)
        next_week_forecast.append(next_day_pred[0, 0])

        # Update last_week_data by removing the first day's data and adding the predicted AQI
        new_input = np.zeros((1, time_step, last_week_data.shape[2]))
        new_input[:, :-1, :] = last_week_data[:, 1:, :]  # Shift by 1
        new_input[:, -1, -1] = next_day_pred  # Add new prediction to AQI feature

        last_week_data = new_input

    # Inverse transform the predicted AQI values back to original scale
    temp_next_week = np.zeros((7, last_week_data.shape[2]))  # Temp array for inverse scaling
    temp_next_week[:, -1] = next_week_forecast  # Fill AQI column with predictions

    # Inverse scale the predictions
    next_week_forecast_original = scaler.inverse_transform(temp_next_week)

    # Extract AQI column after inverse scaling
    next_week_forecast_original = next_week_forecast_original[:, -1]

    return next_week_forecast_original

# Main code to test the functionality
if __name__ == "__main__":
    # Load the trained LSTM model
    model = load_model("C:/Users/nm_ma/Desktop/Eco-Guard/model/best_model.keras")

    # Scale the dummy data
    scaler = MinMaxScaler()
    scaled_data = scaler.fit_transform(dummy_data)

    # Extract the last 7 days of scaled data for prediction
    last_week_data = scaled_data[-7:]

    # Forecast the next week's AQI
    next_week_aqi = forecast_next_week_aqi(model, scaler, last_week_data)

    # Print the forecasted AQI for the next week in original scale
    print("Forecasted AQI for the next week (original scale):")
    print(next_week_aqi)
