import {Box, useMediaQuery,
     useTheme,Typography, 
     Container, Avatar,
     TableRow,TableCell, Link} from "@mui/material";
import CardImage from 'components/CardImage/CardImage';
import icon1 from "assetsIcons/instagram.png" ;
import icon2 from "assetsIcons/atm-card.png";
import icon3 from "assetsIcons/money.png";
import icon4 from "assetsIcons/credit-card.png";
import FlexBetween from "components/FlexBetween";
import NavBar from "scenes/navbar";
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import TableData from 'components/Table/Table'

function createData(Instituiton, description, amount, image) {
    return { Instituiton, description, amount, image };
  }
  
  const rows = [
    createData('Pro-Imobiliaria', "Propina", 6235, icon1),
    createData('ADS' , "Pagamento Agua", -9323, icon2),
    createData('Electra', "Luz mes de janero", 19000, icon3),
    createData('L`Atelier', "Date",  2507, icon4),
  ];


const Historico=()=>{
    const isNonMobile = useMediaQuery("(min-width:600px)");
    //const {_id, picture}= useSelector((state)=>state.user);
    const {  palette} = useTheme();


    return (
        <Box>
        <NavBar/>
            <FlexBetween
                 sx={{
                    display: 'grid',
                    justifyContent: 'center',
                    p: 1, m: 1,
                    width: '100%',
                    height:'350px',
                    borderRadius: 1}}
                backgroundColor={palette.dim.dark} >
                    <FlexBetween sx={{display: 'flex', justifyContent: 'center', borderRadius: 1}} >
                        <Box >
                            <Avatar
                                alt="Remy Sharp"
                                src="/static/images/avatar/1.jpg"
                                sx={{ width: 76, height: 76, position: 'top' }}
                            />   
                         </Box >
                        
                    </FlexBetween>
                    <Typography variant="h2" component="div"  style={{color: 'white' , display: "flex", justifyContent: 'center'}}>
                              Testando
                        </Typography>


               <FlexBetween>
                <Box>
                     <CardImage sx={{ maxWidth: 800,   borderRadius: "20.5px" }}>
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
                </Box>
               
               </FlexBetween>
                    
            </FlexBetween>
            <Container>
            <Typography  variant='h4'  gutterBottom color= {palette.primary.main} style={{display: "flex", justifyContent: 'center'}}>  Ultima Transacoes</Typography>
                <TableData>{/**Falta paginacao da tabela */}
                    {rows
                    .map((row) => (
                        <TableRow
                            key={row.Instituiton}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                            <TableCell > <Avatar
                                    alt="Remy Sharp"
                                    src={row.image}
                                    sx={{ width: 36, height: 36 }} />
                             </TableCell>
                             <Link href="/historico-details" underline="none" color="inherit">
                                 <TableCell>
                                    <Typography variant="h4"  color= {palette.dim.dark} >{row.Instituiton}</Typography>
                                    <Typography variant="h7"  color={palette.dim.dark}>{row.description}</Typography>
                                </TableCell>        
                            </Link>

                             <TableCell> <Typography variant="h4"  color= {palette.dim.dark}>{row.amount}CVE</Typography></TableCell>
                        </TableRow>
                        ))}
                </TableData>
            </Container>
        </Box>
    );
}
export default Historico;