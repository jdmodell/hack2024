import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';


Chart.register(...registerables);

const Graph = () => {
    const [chartData, setChartData] = useState({ labels: [], datasets: [] });
    const [allergyKind, setAllergyKind] = useState("Food"); 
    const [timeframe, setTimeframe] = useState('week'); 
    const allergyKinds = ['Food', 'Seasonal', 'Skin', 'Medicine', 'Animals', 'Other'];
    const timeframes = ['week', 'month', 'year']; 

    const fetchAllergyData = async (kind, timeframe) => {
        const response = await fetch(`http://127.0.0.1:5000/allergies/last_${timeframe}?kind=${kind}`);
        const data = await response.json();

      
        setChartData({
            labels: data.dates, 
            datasets: [
                {
                    label: `${kind} Allergies`,
                    data: data.counts, 
                    fill: false,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    tension: 0.1,
                    borderWidth: 2,
                },
            ],
        });
    };

    useEffect(() => {
        fetchAllergyData(allergyKind, timeframe); 

        const interval = setInterval(() => fetchAllergyData(allergyKind, timeframe), 60000); 
        return () => clearInterval(interval); 
    }, [allergyKind, timeframe]); 

    const handleKindChange = (e) => {
        setAllergyKind(e.target.value); 
    };

    const handleTimeframeChange = (e) => {
        setTimeframe(e.target.value); 
    };


    return (
        <div>
            <h2>Allergies in the Last {timeframe === 'year' ? '12 Months' : timeframe === 'month' ? 'Month' : '7 Days'}</h2>
            <select onChange={handleKindChange} value={allergyKind}>
                {allergyKinds.map((kind) => (
                    <option key={kind} value={kind}>
                        {kind}
                    </option>
                ))}
            </select>
            <select onChange={handleTimeframeChange} value={timeframe}>
                {timeframes.map((frame) => (
                    <option key={frame} value={frame}>
                        {frame.charAt(0).toUpperCase() + frame.slice(1)} 
                    </option>
                ))}
            </select>
            <Bar
                data={chartData}
                options={{
                    
                    plugins: {
                      legend: {
                          display: false,
                      },
                  },
                }}
            />
        </div>
    );
};

export default Graph;
