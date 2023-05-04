import { useState } from "react";
import { Context } from "./Context";

const CurrencyContext = ({ children }) => {
  const [fromCurrency, setFromCurrency] = useState("🇺🇸 USD - United States");
  const [toCurrency, setToCurrency] = useState("cv CVE - Cabo Verde");
  const [firstAmount, setFirstAmount] = useState("alaalla");
  const [secondAmount, setSecondAmount] = useState("");

  const value = {
    fromCurrency,
    setFromCurrency,
    toCurrency,
    setToCurrency,
    firstAmount,
    setFirstAmount,
    secondAmount,
     setSecondAmount
  };
  return (
    <Context.Provider value={value}>
      {children}
    </Context.Provider>
  );
};

export default CurrencyContext;