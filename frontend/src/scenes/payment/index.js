import {Box, useMediaQuery,
    useTheme,Typography, 
    Container, Avatar,
   Grid } from "@mui/material";

import icon1 from "assetsIcons/img1.png" ;
import icon2 from "assetsIcons/img2.png";
import icon3 from "assetsIcons/img3.png";
import icon4 from "assetsIcons/img4.png";
import icon5 from "assetsIcons/money.png";
import icon6 from "assetsIcons/atm-card.png";
import icon7 from "assetsIcons/bank G.png"
import icon8 from "assetsIcons/digital.jpg"
import icon9 from "assetsIcons/credit-card.png"
import FlexBetween from "components/FlexBetween";
import NavBar from "scenes/navbar";


function createData( image) {
   return { image };
 }
 
 const rows = [
   createData(icon1),
   createData(icon2),
   createData(icon3),
   createData(icon4),
   createData(icon5),
   createData(icon6),
   createData(icon7),
   createData(icon8),
   createData(icon9),

 ];


const Pagamento=()=>{
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
                        <FlexBetween sx={{display: 'flex', flexDirection: 'column', borderRadius: 1, padding:'5vh'}}>
                             <Typography  variant='h4'  gutterBottom color= {palette.primary.main} >
                               Saldo Disponivel
                           </Typography>
                           <Typography variant="h2" component="div" color= "white">
                               6,753.00 CVE
                           </Typography>
                       
                        </FlexBetween>
                       
                   </FlexBetween>
                   
           </FlexBetween>
           <Container sx={{display: 'flex', justifyContent: 'center' }}>
           <Box >
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} >
                    {rows.map((row) => (
                            <Grid item xs={4}  sx={{display: 'flex', justifyContent: 'center' }}>
                                <Avatar alt="img"
                                src={row.image}
                                sx={{ width: 76, height: 76, position: 'top' }}/>
                            </Grid>
                        )) }
                </Grid>
            </Box>
           </Container>
       </Box>
   );
}
export default Pagamento;