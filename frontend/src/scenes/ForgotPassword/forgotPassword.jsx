import { useState } from "react";
import { useDispatch } from "react-redux"
import
{Box, useMediaQuery,
useTheme,Typography, 
Container, TextField,Button
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import FlexBetween from "components/FlexBetween";
import { setEmailSend } from "state";



const PasswordSchema = yup.object().shape({
    email: yup.string().email("invalid email").required("Obrigatório"),
   
  });
  const initialValuesAccount = {
    email: "",
  
  };

const FormPassword =()=>{
    const [pageType, setPageType] = useState("sendEmail");
    const { palette } = useTheme();
    const dispatch = useDispatch();
    const isNonMobile = useMediaQuery("(min-width:1000px)");
    const theme = useTheme();
   
    const isSenEmail = pageType === "sendEmail";
    
    
    const creating_Account = async (values, onSubmitProps) => {
      
        const EmailResponse = await fetch('http://localhost:8000/auth/forgotPassword/', {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });
        const emailSent= await EmailResponse.json();
        onSubmitProps.resetForm();
        if (emailSent) {
          dispatch(
            setEmailSend ({
              user: emailSent.user,
            })
          );
          
          // navigate("/account_details");
           
          
        }
      };
      const handleFormSubmit = async (values, onSubmitProps) => {
        if (isSenEmail) await creating_Account(values, onSubmitProps);
      };
    
    return (
<>
    <Box 
          width={isNonMobile ? "50%" : "93%"}
          p="2rem"
          m="2rem auto"
          borderRadius="1.5rem" 
          backgroundColor={theme.palette.dim.dark} >
       
        <Box
          display="flex" 
          alignItems="center"
          justifyContent="center"
          backgroundColor={theme.palette.dim.dark} >
            
          <img src="../assets/logo.png" alt="logo" height={350}width={350} />
        </Box>
        <Typography fontWeight="500" variant="h2" sx={{ mb: "1.5rem" }} color={theme.palette.background.alt}textAlign="center">
         Esqueci Palavra-passe!
        </Typography>
    </Box>
      <Box
          width={isNonMobile ? "50%" : "93%"}
          p="2rem"
          m="2rem auto"
          borderRadius="1.5rem" 
          backgroundColor={theme.palette.background.alt} >
            
         <Formik
                  onSubmit={handleFormSubmit}
                  initialValues={isSenEmail ? initialValuesAccount :""}
                  validationSchema={isSenEmail ? PasswordSchema : ""}
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
                        {isSenEmail && (
                          <>
                          
                            <Typography id="formulario-nome" fontWeight="500" variant="h7"  color={palette.background.dark}>Seu Email</Typography>
                            <TextField
                              label="Seu Email para receber link de redifinição da palavra-passe"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value={values.email}
                              name="email"
                              error={Boolean(touched.email) && Boolean(errors.email)}
                              helperText={touched.email && errors.email}
                              sx={{ gridColumn: "span 4" }}
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
                          {isSenEmail ? "Enviar Email" : ""}
                        </Button>
                        <FlexBetween style={{display:"flex" , justifyContent:"center"}}>
                              <Typography
                              
                                onClick={() => {
                                  setPageType(isSenEmail ? "Enviar Email" : "");
                                  resetForm();
                                  alert("Verifique o seu Email")
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
           
        </Box>
    </>
    )
}

export default FormPassword;