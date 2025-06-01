import { useState, useEffect } from 'react';
import './App.css';
import useCurrencyInfo from './hooks/useCurrency';
import { InputBox } from './components';

import bgImage from './components/bgimg.jpg'
import CurrencyChart from './components/CurrencyChart';
import useChartData from './hooks/useChartData';
import dayjs from "dayjs";
function App() {
  const [amount, setAmount] = useState("");  // Changed to empty string by default
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("inr");
  const [convertedAmount, setConvertedAmount] = useState("");  // Changed to empty string
  const startDate = "2023-01-01";


  const [calculatedDate, setCalculatedDate] = useState("2024-01-01"); // Store calculated date
  const [buttonLabel, setButtonLabel] = useState("!W");
  const handleButtonClick = (label) => {
    setButtonLabel(label);
  };
  // Function to handle button clicks and display the clicked button's label
  useEffect(() => {
    endcalc(buttonLabel);
  }, [buttonLabel]); // Listen only for buttonLabel

  function endcalc(buttonLabel) {
    let newDate = dayjs(startDate); // Ensure startDate is set to a valid format

    if (buttonLabel === "1W") {
      newDate = newDate.add(1, "week"); // Add 1 week to startDate
    } else if (buttonLabel === "1M") {
      newDate = newDate.add(1, "month"); // Add 1 month to startDate
    } else if (buttonLabel === "3M") {
      newDate = newDate.add(3, "months"); // Add 3 months to startDate
    } else if (buttonLabel === "6M") {
      newDate = newDate.add(6, "months"); // Add 6 months to startDate
    } else if (buttonLabel === "1Y") {
      newDate = newDate.add(1, "year"); // Add 1 year to startDate
    }


    setCalculatedDate(newDate.format("YYYY-MM-DD")); // Update the date with the correct format
  }

  const chartData = useChartData(from, to, startDate, calculatedDate); // Use updated calculatedDate here


  // Fetch currency data
  const currencyInfo = useCurrencyInfo(from);
  const options = Object.keys(currencyInfo || {}); // Prevents crash if currencyInfo is null

  // Convert function with safe checks
  const convert = () => {
    if (!amount || isNaN(amount)) {
      setConvertedAmount(""); // Clears output when input is empty
      return;
    }
    if (currencyInfo && currencyInfo[to]) {
      setConvertedAmount(Number(amount) * currencyInfo[to]);
    } else {
      setConvertedAmount("");  // In case conversion fails
    }
  };

  // Swap function with correct state updates
  const swap = () => {
    setFrom(to)
    setTo(from)
    setConvertedAmount(amount)
    setAmount(convertedAmount)
    convert();
  }

  useEffect(() => {
    convert();  // Re-run conversion logic when amount, from, or to change
  }, [amount, from, to, swap]); // Dependency on amount, from, and to

  return (
    <>

      <div
        className='w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat'
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: 'cover', // Ensure the image covers the entire container
          backgroundPosition: 'center', // Center the image to avoid unwanted cropping
        }}
      >
        <h1
        style={{
          fontSize: '5rem',
          fontWeight: 'bold',
          color: '#0d47a1',
          fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
          textShadow: '0 0 10px rgba(255,255,255,0.3)',
          margin: '40px auto',
          textAlign: 'center',
        }}
      >
        Currency Converter
      </h1>
        <div className=" flex gap-[20px]">


          <div className='w-full'>
            <div className='w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30'>
              <form>
                <div className='w-full mb-1 text-black'>
                  <InputBox
                    label="From"
                    amount={amount}
                    currencyOptions={options}
                    onCurrencyChange={(currency) => { setFrom(currency); }}  // Just set the currency
                    onAmountChange={(amount) => { setAmount(amount); }}  // Set amount and trigger convert()
                    selectedCurrency={from}
                  />
                </div>
                <div className='relative w-full h-0.5'>
                  <button
                    type="button"
                    className='absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5'
                    onClick={swap}
                  >
                    Swap
                  </button>
                </div>
                <div className='w-full mb-1 text-black'>
                  <InputBox
                    label="To"
                    currencyOptions={options}
                    amount={convertedAmount}  // Display converted amount in the second input
                    onCurrencyChange={(currency) => { setTo(currency); }}  // Change the 'to' currency
                    selectedCurrency={to}
                    amountDisabled
                  />
                </div>
              </form>
            </div>
          </div>
          <div>
            <div className="flex flex-row gap-2 justify-center mb-4">
              {['1W', '1M', '3M', '6M', '1Y'].map((label, index) => (
                <button
                  onClick={() => {
                    handleButtonClick(label);


                  }}

                  key={index}
                  className="px-4 py-2 rounded-lg border border-orange-500 text-orange-400 
                                       bg-orange-500/10 hover:bg-orange-500/20 active:bg-orange-600/30 
                                       transition-all duration-300 ease-in-out shadow-md backdrop-blur-md"

                >
                  {label}
                </button>
              ))}
            </div>

            <CurrencyChart data={chartData} />
          </div>
        </div>

      </div>
    </>

  );
}

export default App;
