from flask import Flask, jsonify
import pandas as pd
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allow frontend to access the backend

# Load datasets
events_df = pd.read_csv("data/key_events.csv", parse_dates=["Start Date"])
prices_df = pd.read_csv("data/BrentOilPrices.csv", parse_dates=["Date"])  

@app.route('/api/events', methods=['GET'])
def get_events():
    return jsonify(events_df.to_dict(orient='records'))

@app.route('/api/prices', methods=['GET'])
def get_prices():
    return jsonify(prices_df.to_dict(orient='records'))

@app.route('/api/event-impact/<event_name>', methods=['GET'])
def get_event_impact(event_name):
    event = events_df[events_df["Event Name"] == event_name]
    if event.empty:
        return jsonify({"error": "Event not found"}), 404

    date = event["Start Date"].iloc[0]
    before = prices_df[(prices_df["Date"] >= date - pd.Timedelta(days=30)) & (prices_df["Date"] < date)]
    after = prices_df[(prices_df["Date"] > date) & (prices_df["Date"] <= date + pd.Timedelta(days=30))]
    
    return jsonify({
        "event_name": event_name,
        "event_date": date.strftime('%Y-%m-%d'),
        "before": before.to_dict(orient="records"),
        "after": after.to_dict(orient="records")
    })

if __name__ == '__main__':
    app.run(debug=True)
