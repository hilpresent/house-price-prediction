# House Price Prediction

This project predicts house prices based on various features using a Random Forest Regressor. The application is built using Flask for the backend and ReactJS for the frontend. It also includes a feature importance visualization to help understand the influence of each feature on the prediction.

## Features

- Predict house prices based on user inputs
- Display 95% prediction intervals
- Visualize feature importances
- Responsive and user-friendly UI

## Project Structure

```
house-price-prediction/
│
├── backend/
│   ├── app.py
│   ├── model/
│   │   └── model.pkl
│   └── data/
│       └── house_prices.csv
│
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── App.js
│   │   ├── App.css
│   │   ├── FeatureImportanceChart.js
│   │   ├── FeatureImportanceChart.css
│   │   └── index.js
│   └── package.json
│
├── model_training/
│   ├── data_preprocessing.py
│   └── model_training.py
│
└── README.md
```

## Setup and Installation

### Prerequisites

- Python 3.x
- Node.js and npm

### Backend Setup

```bash
# Navigate to the backend directory
cd backend

# Create a virtual environment and activate it
python -m venv venv
source venv/bin/activate  # On Windows use `venv\Scripts\activate`

# Install the required packages
pip install -r requirements.txt

# Run the Flask server
python app.py
```

### Frontend Setup

```bash
# Navigate to the frontend directory
cd ../frontend

# Install the required packages
npm install

# Run the React development server
npm start
```

### Model Training

```bash
# Navigate to the model_training directory
cd ../model_training

# Run the data preprocessing script
python data_preprocessing.py

# Run the model training script
python model_training.py
```

### Usage

Once both the backend and frontend servers are running, open your browser and navigate to:

http://127.0.0.1:5000/

Fill in the input fields and click "Predict" to get the house price prediction along with the 95% prediction interval and feature importance chart.

## Explanation of Key Parts

### Backend (app.py)

- `@app.route('/predict', methods=['POST'])`: This endpoint receives user input, processes it using the trained model, and returns the prediction and prediction interval.
- `@app.route('/feature_importances', methods=['GET'])`: This endpoint returns the feature importances for visualization.

### Frontend (App.js)

- Handles user input and sends it to the backend for prediction.
- Displays the predicted price and prediction interval.
- Renders the feature importance chart.

### Feature Importance Chart (FeatureImportanceChart.js)

- Fetches feature importances from the backend and visualizes them using react-chartjs-2.

## Technical Details

### Flask Application

- The Flask app serves the React frontend and handles API requests for predictions.
- The RandomForestRegressor model is used for predictions, and the feature importances are calculated and returned for visualization.

### React Application

- The React frontend collects user input, sends it to the Flask backend, and displays the prediction results along with the feature importance chart.
