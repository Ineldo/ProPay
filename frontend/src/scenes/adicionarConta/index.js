import { useState } from "react";
import { useDispatch } from "react-redux"
import
{Box, useMediaQuery,
useTheme,Typography, 
Container, TextField,Button,
Grid, InputAdornment, 
IconButton
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import {Visibility,VisibilityOff} from "@mui/icons-material";
import FlexBetween from "components/FlexBetween";
import NavBar from "scenes/navbar";
import { setAccount } from "state";
import LinkIcon from '@mui/icons-material/Link';
import icon1 from "assetsIcons/bank G.png" ;
import icon2 from "assetsIcons/logo1.png"

const AccountSchema = yup.object().shape({
    name: yup.string().required("required"),
    email: yup.string().email("invalid email").required("Obrigatório"),
    password: yup.string().required("Obrigatório"),
    bank_number:yup.string().required("Obrigatório"),    
  });
  const initialValuesAccount = {
    name: "",
    email: "",
    password: "",
    bank_number:"",
  };

const AdicionarConta =()=>{
    const [pageType, setPageType] = useState("account");
    const { palette } = useTheme();
    const dispatch = useDispatch();
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);
    const isCreating = pageType === "account";
    
    
    const creating_Account = async (values, onSubmitProps) => {
      
        const accountResponse = await fetch('http://localhost:8000/users/accounts', {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });
        const accountCreated= await accountResponse.json();
        onSubmitProps.resetForm();
        if (accountCreated) {
          dispatch(
            setAccount ({
              user: accountCreated.user,
              account: accountCreated.token,
            })
          );
          
          // navigate("/account_details");
           
          
        }
      };
      const handleFormSubmit = async (values, onSubmitProps) => {
        if (isCreating) await creating_Account(values, onSubmitProps);
      };
    
    return (
        <Box>
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
              
                    <FlexBetween sx={{ display: 'flex', justifyContent: 'center'}}>
                                    <img src={icon2} alt="logo" height={250}width={250} />
                                        <LinkIcon  sx={{ fontSize: "85px" , color: "white"}}/>
                                    <img src={icon1} alt="logo" height={150}width={150} />
                    </FlexBetween>
                    <Typography sx={{ display: 'flex', justifyContent: 'center'}}>
                            <span style={{color:"white"}}><h3>Conecte-se à sua conta bancária</h3></span>
                    </Typography>
              </Container>
            </FlexBetween>

            <Container sx={{display: 'flex', justifyContent: 'center' }}>
                <Formik
                  onSubmit={handleFormSubmit}
                  initialValues={isCreating ? initialValuesAccount :""}
                  validationSchema={isCreating ? AccountSchema : ""}
                >
                  {({
                    values,
                    errors,
                    touched,
                    handleBlur,
                    handleChange,
                    handleSubmit,
                    setFieldValue,
                    resetForm,
                    
                  }) => (
                    
                    <form onSubmit={handleSubmit}>
                      <Box
                      
                        display="flex"
                        gap="30px"
                        flexDirection="column"
                        sx={{
                          "& > div": { flexDirection: isNonMobile ? undefined : "span 4" },
                        }}
                      >
                        {isCreating && (
                          <>
                          
                            <Typography id="formulario-nome" fontWeight="500" variant="h7"  color={palette.background.dark}>Seu Nome</Typography>
                            <TextField
                              label="Seu Nome"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value={values.name}
                              name="name"
                              error={Boolean(touched.name) && Boolean(errors.name)}
                              helperText={touched.name && errors.name}
                              sx={{ gridColumn: "span 4" }}
                            />
                            <Typography fontWeight="500" variant="h7" color={palette.background.dark}>Conta Bancaria</Typography>
                            <TextField
                              label="Numero da Bancaria"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value={values.bank_number}
                              name="bank_number"
                              error={Boolean(touched.bank_number) && Boolean(errors.bank_number)}
                              helperText={touched.bank_number && errors.bank_number}
                              sx={{ gridColumn: "span 4" }}
                            />
                         
                              <Typography fontWeight="500" variant="h7" color={palette.background.dark}>Email</Typography>
                                  <TextField
                                    label="Email"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.email}
                                    name="email"
                                    error={Boolean(touched.email) && Boolean(errors.email)}
                                    helperText={touched.email && errors.email}
                                    sx={{ gridColumn: "span 4" }}
                                  />

                              <Typography fontWeight="500" variant="h7" color={palette.background.dark}>Palavra-Passe</Typography>
                                <TextField
                                  label="Password"
                                  type={showPassword ? "text" : "password"}
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  value={values.password}
                                  name="password"
                                  error={Boolean(touched.password) && Boolean(errors.password)}
                                  helperText={touched.password && errors.password}
                                  sx={{ gridColumn: "span 4" }}
                                  InputProps={{
                                    endAdornment: (
                                      <InputAdornment position="end">
                                        <IconButton
                                          aria-label="toggle password visibility"
                                          onClick={handleClickShowPassword}
                                          onMouseDown={handleMouseDownPassword}
                                        >
                                          {showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                      </InputAdornment>
                                    ) 
                                  }}
                                />
                                
                            </>
                            )}      
                      </Box>

                      {/* BUTTONS */}
                      <Box>
                        <Button
                          fullWidth
                          type="submit"
                          sx={{
                            m: "2rem 0",
                            p: "1rem",
                            backgroundColor: palette.dim.gold,
                            color: palette.background.alt,
                            "&:hover": { color: palette.dim.gold },
                          }}
                        >
                          {isCreating ? "Criar Conta Bancaria" : ""}
                        </Button>
                        <FlexBetween style={{display:"flex" , justifyContent:"center"}}>
                              <Typography
                              
                                onClick={() => {
                                  setPageType(isCreating ? "criar conta" : "");
                                  resetForm();
                                }}
                                sx={{
                                  textDecoration: "underline",
                                  color: palette.dim.dark,
                                  "&:hover": {
                                    cursor: "pointer",
                                    color: palette.dim.dark,
                                  },
                                }}
                              >
                              </Typography>
                            </FlexBetween>
                              
                        
                      </Box>
                    </form>
                  )}
                </Formik>
            </Container>
           
        </Box>
    )
}

export default AdicionarConta;