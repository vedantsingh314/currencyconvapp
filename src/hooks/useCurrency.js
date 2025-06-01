import { useEffect,useState } from "react";

function useCurrencyInfo(currency){
    const [data,setdata]=useState([])
    useEffect(() => {
        fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency}.json`)
            .then((res) => res.json())
            .then((res) => {
                console.log("API Response:", res); // Debugging
                setdata(res[currency] || {});
            })
            .catch((err) => console.error("Error fetching data:", err));
    }, [currency]);
    
   
    return data;

}

export default useCurrencyInfo;