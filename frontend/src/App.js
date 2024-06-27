import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import FeatureImportanceChart from './FeatureImportanceChart';

function App() {
    // initial feature values
    const initialFeatures = {
        area: '',
        bedrooms: '',
        bathrooms: '',
        stories: '',
        mainroad: '',
        guestroom: '',
        basement: '',
        hotwaterheating: '',
        airconditioning: '',
        parking: '',
        prefarea: '',
        furnishingstatus: ''
    };

    const [features, setFeatures] = useState(initialFeatures)
    const [prediction, setPrediction] = useState(null);
    const [error, setError] = useState(null);
    const [savedPredictions, setSavedPredictions] = useState([]);
    const [showFeatureImportances, setShowFeatureImportances] = useState(false)

    useEffect(() => {
        console.log('App component mounted.')
    }, []);

    const handleChange = (e) => {
        setFeatures({
            ...features,
            [e.target.name]: e.target.value
        });
    };

    const furnishingStatusMapping = {
        'furnished': 2,
        'semi-furnished': 1,
        'unfurnished': 0
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // simple validation to ensure form is filled out
        for (const key in features) {
            if (features[key] === '') {
                setError(`Please fill out ${key} field.`)
                return;
            }
        }

        setError(null);

        // convert categorical vars to numerical
        const convertedFeatures = [
            parseInt(features.area) || 0,
            parseInt(features.bedrooms) || 0,
            parseInt(features.bathrooms) || 0,
            parseInt(features.stories) || 0,
            features.mainroad === 'yes' ? 1 : 0,
            features.guestroom === 'yes' ? 1 : 0,
            features.basement === 'yes' ? 1 :  0,
            features.hotwaterheating === 'yes' ? 1 : 0,
            features.airconditioning === 'yes' ? 1 : 0,
            parseInt(features.parking) || 0,
            features.prefarea === 'yes' ? 1 : 0,
            furnishingStatusMapping[features.furnishingstatus] || 0
        ];

        console.log('Submitting features:', convertedFeatures);

        axios.post('/predict', { features: convertedFeatures })
            .then(response => {
                setPrediction(response.data);
                setSavedPredictions([...savedPredictions, response.data]);
                setShowFeatureImportances(true);
                console.log('Prediction received.', response.data);
            })
            .catch(error => console.log('There was an error when making the request:', error));
    };

    return (
        <div className='container'>
            <div className='title'>House Price Prediction</div>
            <div className='App'>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Area:</label>
                        <input type='number' name='area' value={features.area} onChange={handleChange} />
                    </div>
                    <div>
                        <label>Bedrooms:</label>
                        <select name='bedrooms' value={features.bedrooms} onChange={handleChange}>
                            <option value=''>Select:</option>
                            <option value='0'>0</option>
                            <option value='1'>1</option>
                            <option value='2'>2</option>
                            <option value='3'>3</option>
                            <option value='4'>4</option>
                            <option value='5'>5</option>
                            <option value='6'>6</option>
                            <option value='7'>7</option>
                        </select>
                    </div>
                    <div>
                        <label>Bathrooms:</label>
                        <select name='bathrooms' value={features.bathrooms} onChange={handleChange}>
                            <option value=''>Select:</option>
                            <option value='0'>0</option>
                            <option value='1'>1</option>
                            <option value='2'>2</option>
                            <option value='3'>3</option>
                            <option value='4'>4</option>
                            <option value='5'>5</option>
                        </select>
                    </div>
                    <div>
                        <label>Stories:</label>
                        <select name='stories' value={features.stories} onChange={handleChange}>
                            <option value=''>Select:</option>
                            <option value='0'>0</option>
                            <option value='1'>1</option>
                            <option value='2'>2</option>
                            <option value='3'>3</option>
                            <option value='4'>4</option>
                            <option value='5'>5</option>
                        </select>
                    </div>
                    <div>
                        <label>Main Road:</label>
                        <select name='mainroad' value={features.mainroad} onChange={handleChange}>
                            <option value=''>Select:</option>
                            <option value='yes'>Yes</option>
                            <option value='no'>No</option>
                        </select>
                    </div>
                    <div>
                        <label>Guest Room:</label>
                        <select name='guestroom' value={features.guestroom} onChange={handleChange}>
                            <option value=''>Select:</option>
                            <option value='yes'>Yes</option>
                            <option value='no'>No</option>
                        </select>
                    </div>
                    <div>
                        <label>Basement:</label>
                        <select name='basement' value={features.basement} onChange={handleChange}>
                            <option value=''>Select:</option>
                            <option value='yes'>Yes</option>
                            <option value='no'>No</option>
                        </select>
                    </div>
                    <div>
                        <label>Hot Water Heating:</label>
                        <select name='hotwaterheating' value={features.hotwaterheating} onChange={handleChange}>
                            <option value=''>Select:</option>
                            <option value='yes'>Yes</option>
                            <option value='no'>No</option>
                        </select>
                    </div>
                    <div>
                        <label>Air Conditioning:</label>
                        <select name='airconditioning' value={features.airconditioning} onChange={handleChange}>
                            <option value=''>Select:</option>
                            <option value='yes'>Yes</option>
                            <option value='no'>No</option>
                        </select>
                    </div>
                    <div>
                        <label>Parking:</label>
                        <select name='parking' value={features.parking} onChange={handleChange}>
                            <option value=''>Select:</option>
                            <option value='0'>0</option>
                            <option value='1'>1</option>
                            <option value='2'>2</option>
                            <option value='3'>3</option>
                            <option value='4'>4</option>
                        </select>
                    </div>
                    <div>
                        <label>Preferred Area:</label>
                        <select name='prefarea' value={features.prefarea} onChange={handleChange}>
                            <option value=''>Select:</option>
                            <option value='yes'>Yes</option>
                            <option value='no'>No</option>
                        </select>
                    </div>
                    <div>
                        <label>Furnishing Status:</label>
                        <select name='furnishingstatus' value={features.furnishingstatus} onChange={handleChange}>
                            <option value=''>Select:</option>
                            <option value='furnished'>Furnished</option>
                            <option value='semi-furnished'>Semi-Furnished</option>
                            <option value='unfurnished'>Unfurnished</option>
                        </select>
                    </div>
                    <button type='submit'>Predict</button>
                </form>
                <div className='results'>
                    {prediction && (
                        <>
                            <div className='prediction'>
                                <p>Predicted Price: ${prediction.prediction.toLocaleString()}</p>
                                <p>95% Prediction Interval: ${prediction.lower_bound.toLocaleString()} – ${prediction.upper_bound.toLocaleString()}</p>
                            </div>
                            {showFeatureImportances && <FeatureImportanceChart />}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default App;