import FlexBetween from "components/FlexBetween";
import BasicSelect from "components/SelectButton";
import {Typography, TextField, Box  } from "@mui/material";
import PropTypes from 'prop-types'

function CurrencyInput(props){
   return ( 
    <Box>
        <FlexBetween sx={{display:'flex', justifyContent:'center'}}>
            <Typography  >
                <TextField value={props.amount} onChange={ev => props.onAmountChange(ev.target.value)}/>
            </Typography><BasicSelect value={props.currency} onChange={ev => props.onCurrencyChange(ev.target.value)}>
                {props.currencies.map((currency=>(
                    <option value={currency}>{currency}</option>
                )))}
            </BasicSelect>
        </FlexBetween>
    </Box>
    )
}

CurrencyInput.propTypes ={
    amount: PropTypes.number.isRequired,
    currency: PropTypes.string.isRequired,
    currencies: PropTypes.array,
    onAmountChange: PropTypes.func,
    onCurrencyChange: PropTypes.func,

}

export default CurrencyInput;