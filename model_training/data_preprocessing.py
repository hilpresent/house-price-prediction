import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler

def load_and_preprocess_data(filepath):
    # read in csv file
    df = pd.read_csv(filepath)

    # map categorical columns to numerical
    df['mainroad'] = df['mainroad'].map({'yes': 1, 'no': 0})
    df['guestroom'] = df['guestroom'].map({'yes': 1, 'no': 0})
    df['basement'] = df['basement'].map({'yes': 1, 'no': 0})
    df['hotwaterheating'] = df['hotwaterheating'].map({'yes': 1, 'no': 0})
    df['airconditioning'] = df['airconditioning'].map({'yes': 1, 'no':0})
    df['prefarea'] = df['prefarea'].map({'yes': 1, 'no':0})
    df['furnishingstatus'] = df['furnishingstatus'].map({'furnished': 2, 'semi-furnished': 1, 'unfurnished': 0})

    # drop all rows with empty values in numerical columns
    df = df.select_dtypes(include=['number']).dropna()

    # separate features and target variables
    X = df.drop('price', axis=1)
    y = df['price']

    # split into train and test data
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    # standardize the features to have 0 mean and unit variance
    scaler = StandardScaler()
    X_train = scaler.fit_transform(X_train)
    X_test = scaler.transform(X_test)

    return X_train, X_test, y_train, y_test

if __name__ == '__main__':
    X_train, X_test, y_train, y_test = load_and_preprocess_data('../data/house_prices.csv')
    print('Data has finished processing.')