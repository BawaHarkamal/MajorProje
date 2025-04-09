# sales_forecast.py

import pandas as pd
from prophet import Prophet
from pymongo import MongoClient
from datetime import datetime

# Step 1: Load and Prepare Data
data = pd.read_csv('sales_data/PJME_hourly.csv', parse_dates=[0])
data = data.rename(columns={'Datetime': 'ds', 'PJME_MW': 'y'})

# Step 2: Aggregate Hourly to Daily
daily_data = data.resample('D', on='ds').sum().reset_index()

# Step 3: Train Prophet Model
model = Prophet()
model.fit(daily_data)

# Step 4: Predict Next 1 Year
future = model.make_future_dataframe(periods=365)
forecast = model.predict(future)
forecast_result = forecast[['ds', 'yhat']].tail(365)  # Last 1 year

# Step 5: Store Forecast in MongoDB
client = MongoClient('mongodb+srv://luckybawa2502:bJl83IqU2cQx7Nnl@cluster0.4zzg0.mongodb.net/')  # Replace with your URI if needed
db = client['your_database_name']                   # Replace with your DB name
collection = db['sales_forecast']                   # Collection name

# Optional: Clear old records before inserting
# collection.delete_many({})  # Comment this if you want to keep history

# Insert forecast
records = []
for _, row in forecast_result.iterrows():
    records.append({
        "date": row['ds'].strftime("%Y-%m-%d"),
        "predicted_sales": float(row['yhat'])
    })

collection.insert_many(records)

print("✅ Sales forecast for 1 year inserted into MongoDB successfully.")
