# House Price Prediction Project

## Overview

This project predicts house prices using a machine learning model. It features a Flask backend and a ReactJS frontend.

## Project Structure

house_price_prediction/
├── backend/
│ ├── app.py
│ ├── model/
│ │ └── model.pkl
│ ├── static/
│ ├── templates/
│ └── requirements.txt
├── frontend/
│ ├── public/
│ ├── src/
│ │ ├── components/
│ │ ├── App.js
│ │ ├── index.js
│ │ └── ...
│ └── package.json
├── data/
│ └── house_prices.csv
├── model_training/
│ ├── data_preprocessing.py
│ ├── model_training.py
│ └── requirements.txt
└── README.md


## Setup and Installation

### Prerequisites

- Python 3.7+
- Node.js and npm
- Visual Studio Code (VS Code) or any other code editor

### Backend Setup (Flask)

1. **Navigate to the `backend/` directory**:
   ```bash
   cd backend