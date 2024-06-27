from flask import Flask, jsonify, request, send_from_directory
import numpy as np
import joblib

app = Flask(__name__, static_folder='../frontend/build', static_url_path='/')

# load trained model and feature importances
model, feature_importances = joblib.load('model/model.pkl')

# serve React frontend
@app.route('/')
def serve():
    return send_from_directory(app.static_folder, 'index.html')

# predict endpoint
@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json(force=True)
    features = np.array(data['features']).reshape(1, -1)

    prediction = model.predict(features)[0]
    predictions = [estimator.predict(features)[0] for estimator in model.estimators_]

    lower_bound = np.percentile(predictions, 2.5)
    upper_bound = np.percentile(predictions, 97.5)

    return jsonify({
        'prediction': prediction.tolist(),
        'lower_bound': lower_bound,
        'upper_bound': upper_bound
    })

# feature importances endpoint
@app.route('/feature_importances', methods=['GET'])
def get_feature_importances():
    return jsonify({
        'feature_importances': feature_importances.tolist()
    })

if __name__ == '__main__':
    app.run(debug=True)
