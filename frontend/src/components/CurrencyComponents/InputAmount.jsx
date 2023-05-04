import {Box, inputAdornment, TextField} from "@mui/material";
import { useContext } from "react";
import CurrencyContext from "context/CurrencyContext";

const InputAmount = ()=>{
    const {firstAmount, setFirstAmount} = useContext(CurrencyContext)
    const {secondAmount, setSecondAmount} = useContext(CurrencyContext)


    return(
        <Box>
            <TextField
                value={firstAmount}
                onChange={e=>{setFirstAmount(e.target.value)}}
                label= "Quantia"
                fullWidth
                inputProps={{
                    type: "number",
                    startAdornment:<inputAdornment position="start">$</inputAdornment>
                }}
            />
             <TextField
                value={secondAmount}
                onChange={e=>{setSecondAmount(e.target.value)}}
                label= "Quantia"
                fullWidth
                inputProps={{
                    type: "number",
                    startAdornment:<inputAdornment position="start">ECV</inputAdornment>
                }}
            />
        </Box>
    )
}

export default InputAmount;

