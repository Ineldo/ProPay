import {Box, useMediaQuery, useTheme,Typography, Link} from "@mui/material";
import ButtonFunction from 'components/ButtonFunction/ButtonFunction';
import CardImage from 'components/CardImage/CardImage';
import img from "assetsIcons/digital.jpg";
import icon1 from "assetsIcons/instagram.png" ;
import icon2 from "assetsIcons/atm-card.png";
import icon3 from "assetsIcons/money.png";
import icon4 from "assetsIcons/credit-card.png";
import icon5 from "assetsIcons/Store.png";
import FlexBetween from "components/FlexBetween";
import NavBar from "scenes/navbar";
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';



//  import {useSelector,Typography,} from "react-redux";



const HomePage=()=>{
    const isNonMobile = useMediaQuery("(min-width:600px)");
    //const {_id, picture}= useSelector((state)=>state.user);
    
    const {  palette} = useTheme();
    // const neutralLight = theme.palette.neutral.light;
    // const dark = theme.palette.neutral.dark;
    // const background = theme.palette.background.default;
    // const primaryLight = theme.palette.primary.light;
    // const alt = theme.palette.background.alt;

    return (
        <Box>
            <NavBar/>
            <FlexBetween>
                <Box 
                sx={{
                    backgroundImage:`url(${img})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundColor:"black",
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    height:600,
                    width:"100%"
                }}>
                   
                </Box>
            </FlexBetween>
            <FlexBetween
                 sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    p: 1,
                    width: '100%',
                    height:'230px',
                    borderRadius: 1}}
                backgroundColor={palette.dim.dark}
                >
                    <CardImage sx={{ maxWidth: 800,   borderRadius: "20.5px",}}>
                        <CardContent >
                            <Typography  variant='h4'  gutterBottom color= {palette.primary.main} style={{display: "flex", justifyContent: 'center'}}>
                                Saldo Disponivel
                            </Typography>
                            <Typography variant="h2" component="div" color= {palette.primary.dark}>
                                6,753.00 CVE
                            </Typography>
                        </CardContent>
                        <CardActions sx={{ display: "flex", justifyContent: 'center',}}>
                            <Button sx={{
                                    backgroundColor:"#c19559",
                                    borderRadius: "0.5px",
                                    "&:hover": { cursor: "pointer" , color: palette.dim.gold}
                                    }}>
                                <span style={{color: 'white'}}>Transferir</span>
                            </Button>
                        </CardActions>
                    </CardImage>
            </FlexBetween>
            <FlexBetween
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    p: 1, m: 1,
                    borderRadius: 1,
                }}
              >                
                    <Box
                    display="grid"
                    gap="30px"
                    gridTemplateColumns="repeat(12,  1fr)"
                    sx={{
                    "& > div": { gridColumn: isNonMobile ? undefined : "span 6" },
                    }}>
                        <Box gridColumn="span 6">
                                <ButtonFunction 
                                    border="2px solid black"
                                    backgroundColor={palette.dim.dark}
                                    borderRadius= "20px"
                                    color="#c19559"
                                    padding={"2.5%"}
                                    onClick={() => alert("Please select other ButtonFunction")}
                                    fontWeight="700"
                                    ><img src={icon1} color="#c19559" alt="icon" width="20%" height="10%"/>
                                    <Typography><span style={{color: 'white'}}>ENVIAR</span> DINHEIRO </Typography>   
                                </ButtonFunction>                   
                         </Box>
                         <Box gridColumn="span 6">
                                <ButtonFunction 
                                    border="2px solid black"
                                    backgroundColor={palette.dim.dark}
                                    borderRadius= "20px"
                                    color="#c19559"
                                    padding={"2.5%"}
                                    onClick={() => alert("Please select other ButtonFunction")}
                                    fontWeight="700"
                                    ><img src={icon2} color="#c19559" alt="icon" width="20%" height="10%"/>
                                    <Typography><span style={{color: 'white'}}>LEVANTAR</span> DINHEIRO </Typography>  
                                    
                                </ButtonFunction>
                        </Box>
                        <Box gridColumn="span 6">
                            <ButtonFunction 
                                border="2px solid black"
                                backgroundColor={palette.dim.dark}
                                borderRadius= "20px"
                                color="#c19559"
                                padding={"2.5%"}
                                        
                                onClick={() => alert("Please select other ButtonFunction")}
                                fontWeight="700"
                                ><img src={icon3} color="#c19559" alt="icon" width="20%" height="10%"/>
                                <Typography><span style={{color: 'white'}}>PEDIR</span> DINHEIRO </Typography>  
                                
                            </ButtonFunction>                     
                       </Box>
                        <Box gridColumn="span 6">
                            <ButtonFunction 
                                border="2px solid black"
                                backgroundColor={palette.dim.dark}
                                borderRadius= "20px"
                                color="#c19559"
                                padding={"2.5%"}
                                        
                                onClick={() => alert("Please select other ButtonFunction")}
                                fontWeight="700"
                                ><img src={icon4} color="#c19559" alt="icon" width="20%" height="10%"/>
                                <Typography>PAGAR COM<span style={{color: 'white'}}> PROPAY</span></Typography>  
                                
                            </ButtonFunction>    
                        </Box>           
                           
                    </Box>
                    
            </FlexBetween>
            <FlexBetween
             sx={{
                display: 'flex',
                justifyContent: 'center',
                p: 1, m: 1,
                borderRadius: 1,
            }}>
                        <Box
                        display="grid"
                        gap="30px"
                        gridTemplateColumns="repeat(12, 1fr)"
                        sx={{
                        "& > div": { gridColumn: isNonMobile ? undefined : "span 6" },
                        }}>
                            <Box gridColumn="span 12">
                                <ButtonFunction 
                                    border="2px solid black"
                                    backgroundColor={palette.dim.dark}
                                    borderRadius= "20px"
                                    color="#c19559"
                                    padding={"2.5%"}
                                    fontWeight="700"
                                    ><img src={icon5} color="#c19559" alt="icon" width="12%" height="10%"/>
                                    <Link href="https://www.prosucesso.cv/loja" underline="none" color="inherit">
                                           <Typography>COMPRAR NA<span style={{color: 'white'}}> PRO LOJA</span></Typography>  
                                  </Link>
                                </ButtonFunction>    
                            </Box>  
                        </Box>
                    </FlexBetween>
        </Box> 
    ) 
    
}

export default HomePage;