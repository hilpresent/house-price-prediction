import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import './FeatureImportanceChart.css';

// register Chart.js components
Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const FeatureImportanceChart = () => {
    const [data, setData] = useState({
        labels: [],
        datasets: [{
            label: 'Feature Importance',
            data: [],
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
        }]
    });

    // get feature importances (but only when the component mounts)
    useEffect(() => {
        axios.get('/feature_importances')
            .then(response => {
                const importances = response.data.feature_importances;
                const labels = [
                    'Area', 'Bedrooms', 'Bathrooms', 'Stories', 'Main Road',
                    'Guest Room', 'Basement', 'Hot Water Heating', 'Air Conditioning',
                    'Parking', 'Preferred Area', 'Furnishing Status'
                ];

                setData({
                    labels: labels,
                    datasets: [{
                        label: 'Feature Importance',
                        data: importances,
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1,
                    }]
                });
            })
            .catch(error => console.log('Error fetching feature importances', error));
    }, []);

    return (
        <div className="feature-importance-chart">
            <h2>Feature Importance</h2>
            <Bar data={data} options={{ responsive: true, maintainAspectRatio: false }} />
        </div>
    );
};

export default FeatureImportanceChart;
