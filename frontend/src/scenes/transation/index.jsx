import NavBar from "scenes/navbar";
import 
{Box,Container,Typography,TextField,
useTheme, Card, Grid, CardContent,
Button} from "@mui/material";
import FlexBetween from "components/FlexBetween";
import {useState, useEffect} from 'react';
import axios from "axios";
import ButtonFunction from 'components/ButtonFunction/ButtonFunction';
// import SyncAltIcon from '@mui/icons-material/SyncAlt';
// import PaymentsIcon from '@mui/icons-material/Payments';
//   {/* <PaymentsIcon sx={{fontSize: "150px",  color:"#c19559" }} alt='Transacoes' />
//                <SyncAltIcon sx={{fontSize: "150px", color:"#c19559" }} alt='Transacoes'/> */}

   



const Transacoes=()=>{
    
    const [amounts, setAmount] = useState('')
    const [qrImage, setQrImage] = useState('')
    const {palette} = useTheme();

    

    const generateQrCode =(e)=>{
        e.preventDefault();
        axios({
            method: 'post',
            url: 'http://localhost:8000/users/transacoes',
            headers: {}, 
            data: {
                amount: amounts, 
            }
          })       
       .then(response=>{
            console.log(response)
        
       }).catch(response=>{
        console.log(response)
       })
       ;
       
    }

   
   return (
    <Box>{/*Esperar por um design */}
        <NavBar/>
        <FlexBetween
                 sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    p: 1, m: 1,
                    width: '100%',
                    height:'300px',
                    borderRadius: 1}}
                    backgroundColor='#0A0A0A'
               >
              <Container>
                    <Card>
                        <CardContent>
                            <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                            <TextField label="Escreva a quantia" onChange={(e)=>setAmount(e.target.value)} value={amounts}><span style={{color: 'white'}}>Escreva a quantia</span></TextField>
                            <ButtonFunction 
                                    border="2px solid black"
                                    backgroundColor={palette.dim.dark}
                                    borderRadius= "20px"
                                    color="#c19559"
                                    padding={"2.5%"}
                                    onClick={generateQrCode}
                                    fontWeight="700"
                                    >
                                    <Typography><span style={{color: 'white'}}>Gerar Codigo</span></Typography>   
                            </ButtonFunction>   

                            </Grid>
                            <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                                {
                                    amounts.length > 0 && qrImage
                                    ?
                                    <></>
                                    :
                                    null
                                }
                            </Grid>
                        </CardContent>
                    </Card>
              </Container>
        
        </FlexBetween>
        
        <Container sx={{display: 'flex', justifyContent: 'center' }}>
                 <Typography>Lkakakakakka</Typography>
         </Container>   
            
     </Box>
    
      
   );
}
export default Transacoes;