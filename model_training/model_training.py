import joblib
from sklearn.ensemble import RandomForestRegressor
from data_preprocessing import load_and_preprocess_data

def train_and_save_model():
    # load and preprocess data
    X_train, X_test, y_train, y_test = load_and_preprocess_data('../data/house_prices.csv')

    # initialize the model
    model = RandomForestRegressor(n_estimators=100, random_state=42)

    # train the model
    model.fit(X_train, y_train)

    # get feature importances
    feature_importances = model.feature_importances_

    # save trained model and feature importances
    joblib.dump((model, feature_importances), '../backend/model/model.pkl')
    print('Model training complete and saved.')

if __name__ == '__main__':
    train_and_save_model()