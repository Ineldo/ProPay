import {Box, Typography, useTheme, useMediaQuery} from '@mui/material';
import Form from "./Form";


const LoginPage=()=>{
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    const theme = useTheme();
    
    return <Box>
     
        <Box 
          width={isNonMobileScreens ? "50%" : "93%"}
          p="2rem"
          m="2rem auto"
          borderRadius="1.5rem" 
          backgroundColor={theme.palette.dim.dark} >
        <Typography fontWeight="500" variant="h2" sx={{ mb: "1.5rem" }} color={theme.palette.background.alt}textAlign="center">
         Bem Vindo!
        </Typography>
        <Box
          display="flex" 
          alignItems="center"
          justifyContent="center"
          backgroundColor={theme.palette.dim.dark} >
            
          <img src="../assets/logo.png" alt="logo" height={350}width={350} />
        </Box>
      </Box>
      <Box
          width={isNonMobileScreens ? "50%" : "93%"}
          p="2rem"
          m="2rem auto"
          borderRadius="1.5rem" 
          backgroundColor={theme.palette.background.alt} >
      <Form />
      </Box>
    </Box>
}

export default LoginPage;