import NavBar from "scenes/navbar";
import {Box, Container} from "@mui/material";
import CurrencyInput from "./CurrencyInput";
import {useState, useEffect } from 'react';
import axios from 'axios'

const App=()=>{
   const [amount1, setAmount1]= useState()
   const [amounts2, setAmounts2]= useState()
   const [currency1, setCurrency1]= useState('USD')
   const [currency2, setCurrency2]= useState('USD')
    const [rates, setRates] = useState({})

   useEffect(() => {
    axios({
        method: 'GET',
        url: "https://api.freecurrencyapi.com/v1/latest?",
        headers: {
          apikey: "TjVGyWSgOqU3N1kR4Oy5I4rwAHrCDwZaFu9JpVSJ"
        }
      })
      .then(response => {setRates(response.data)})
   }, [])

    useEffect(() => {
        if (!!rates) {
          function init() {
            handleAmount1Change(1);
          }
          init();
        }
      }, [rates]);
    
    
    
      function format(number) {
        return number.toFixed(4);
      }
    
      function handleAmount1Change(amount1) {
        setAmounts2(format(amount1 * rates[currency2] / rates[currency1]));
        setAmount1(amount1);
      }
    
      function handleCurrency1Change(currency1) {
        setAmounts2(format(amount1 * rates[currency2] / rates[currency1]));
        setCurrency1(currency1);
      }
    
      function handleAmount2Change(amounts2) {
        setAmount1(format(amounts2 * rates[currency1] / rates[currency2]));
        setAmounts2(amounts2);
      }
    
      function handleCurrency2Change(currency2) {
        setAmount1(format(amounts2 * rates[currency1] / rates[currency2]));
        setCurrency2(currency2);
      }
   return (
    <Box>
        <NavBar/>
        <Container>
             <CurrencyInput key={Object.keys(rates.data|| {})}
             onAmountChange={handleAmount1Change}
             onCurrencyChange={handleCurrency1Change}
             currencies={Object.keys(rates.data|| {})} 
             amount={amount1}
             currency={currency1} />
             <CurrencyInput key={(rates.data)}
             onAmountChange={handleAmount2Change}
             onCurrencyChange={handleCurrency2Change}
             currencies={Object.keys(rates.data|| {})}
             amount={amounts2}
             currency={currency2}/>
        </Container>
        
    </Box>
    
      
   );
}
export default App;