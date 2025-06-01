import { useState, useEffect } from 'react';

function useChartData(from, to, startDate, endDate) {
    const [chartData, setChartData] = useState({ dates: [], rates: [] });

    useEffect(() => {
        const fetchData = () => {
            fetch('/Exchangerate.json') // ✅ Ensure correct file path
                .then((res) => res.json())
                .then((data) => {
                    if (data.success) {
                        console.log('API fetched');
                        const dates = Object.keys(data.quotes);

                        // Filter dates between startDate and endDate
                        const filteredDates = dates.filter((date) => {
                            const currentDate = new Date(date);
                            return currentDate >= new Date(startDate) && currentDate <= new Date(endDate);
                        });

                        // Get rates for the filtered dates
                        const filteredRates = filteredDates.map((date) => {
                            const key = `${from.toUpperCase()}${to.toUpperCase()}`;
                            return data.quotes[date][key] ?? null; // Handle missing values
                        });

                        console.log('Filtered dates:', filteredDates);
                        console.log('Filtered rates:', filteredRates);

                        setChartData({ dates: filteredDates, rates: filteredRates });
                    } else {
                        console.error('Error fetching the data:', data.error);
                    }
                })
                .catch((e) => {
                    console.error('API request failed:', e);
                });
        };

        fetchData();
    }, [from, to, startDate, endDate]); // Dependency on from, to, startDate, and endDate

    return chartData;
}

export default useChartData;
