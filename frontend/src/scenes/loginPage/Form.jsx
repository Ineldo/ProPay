import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
  InputAdornment, 
  IconButton
} from "@mui/material";
import { Formik } from "formik";
import Dropzone from "react-dropzone";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import * as yup from "yup";
import { useNavigate, Link/* useLocation*/ } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "state";
import {Visibility,VisibilityOff} from "@mui/icons-material";
import FlexBetween from "components/FlexBetween";
//import useAuth from "hooks/useAuth"

const registerSchema = yup.object().shape({
  name: yup.string().required("required"),
  email: yup.string().email("invalid email").required("Obrigatório"),
  password: yup.string().required("Obrigatório"),
  address: yup.string().required("Obrigatório"),
  bank_account:yup.string().required("Obrigatório"),
  phone_number:yup.string().required("Obrigatório"),
  picture: yup.mixed(),
  
  
});


const loginSchema = yup.object().shape({
 // name: yup.string().required("required"),
  email: yup.string().email("invalid email").required("Obrigatório"),
  // email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("Obrigatório"),
});

const initialValuesRegister = {
  name: "",
  email: "",
  password: "",
  address: "",
  bank_account:"",
  phone_number:"",
  picture:"",
};

const initialValuesLogin = {
 // name: "",
  email:"",
  password: "",
};



const Form = () => {
  const [pageType, setPageType] = useState("login");
  //const {setAuth}= useAuth();
 // const location = useLocation();
 // const  from = location.state?.from?.pathname || '/' 

  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
 

  const register = async (values, onSubmitProps) => {
    // this allows us to send form info with image
        
    const formData = new FormData();
    for (let value in values) {
      formData.append(value, values[value]);
    }
    formData.append("picture", values.picture.name);

    const savedUserResponse = await fetch(  
      'http://localhost:8000/auth/register',//adicionar no .env
      {
        method: "POST",
        body: formData,
      }
    );
    const savedUser = await savedUserResponse.json();
    
    onSubmitProps.resetForm();

    if (savedUser) {
      setPageType("login");
    }
  };

  const login = async (values, onSubmitProps) => {
      
    const loggedInResponse = await fetch('http://localhost:8000/auth/login', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const loggedIn = await loggedInResponse.json();
    onSubmitProps.resetForm();
    if (loggedIn) {
      dispatch(
        setLogin({
          user: loggedIn.user,
          token: loggedIn.token,
        })
      );
      
       navigate("/home");
       
      
    }
  };

 

  const handleFormSubmit = async (values, onSubmitProps) => {
    if (isLogin) await login(values, onSubmitProps);
    if (isRegister) await register(values, onSubmitProps);
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
      validationSchema={isLogin ? loginSchema : registerSchema}
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
            {isRegister && (
              <>
                  
                    <Box sx={{display:"flex",
                    justifyContent: "center", alignItems: "center"
                        }} >
                    <Dropzone
                          acceptedFiles=".jpg,.jpeg,.png"
                          multiple={false}
                          onDrop={(acceptedFiles) =>
                            setFieldValue("picture", acceptedFiles[0])
                          
                          }>
                          {({ getRootProps, getInputProps }) => (
                            <Box
                              {...getRootProps()}
                              border={'none'}
                              p="1rem"
                              sx={{ "&:hover": { cursor: "pointer" }, borderRadius: '50%', }}
                            >
                              <input {...getInputProps()} />
                              {!values.picture ? (
                               <img src="../assets/avatar.png" alt="Sua Foto" height="75px" width="75px"  />
                              ) : (
                                <FlexBetween>
                                <Typography>{values.picture.name}</Typography>
                                  <EditOutlinedIcon />
                                </FlexBetween>
                              )}
                            </Box>
                          )}
                        </Dropzone>
                </Box>
              
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
                  label="Conta Bancaria"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.bank_account}
                  name="bank_account"
                  error={Boolean(touched.bank_account) && Boolean(errors.bank_account)}
                  helperText={touched.bank_account && errors.bank_account}
                  sx={{ gridColumn: "span 4" }}
                />
              <Typography fontWeight="500" variant="h7" color={palette.background.dark}>Número Telefone</Typography>
              <TextField
                    label="Numero Telefone"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.phone_number}
                    name="phone_number"
                    error={Boolean(touched.phone_number) && Boolean(errors.phone_number)}
                    helperText={touched.phone_number && errors.phone_number}
                    sx={{ gridColumn: "span 4" }}
                  />
              <Typography fontWeight="500" variant="h7" color={palette.background.dark}>Seu Endereço</Typography>
              <TextField
                    label="Endereço"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.address}
                    name="address"
                    error={Boolean(touched.address) && Boolean(errors.address)}
                    helperText={touched.address && errors.address}
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
              </>
              
            )}
            {isLogin && (
                <>
                    <Typography fontWeight="500" variant="h7" color={palette.background.dark}>Email/Nome</Typography>
                      <TextField
                        label="Email ou Nome"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.email}
                        name="email"
                        error={Boolean(touched.email) && Boolean(errors.email) }
                        helperText={touched.email && errors.email}
                        sx={{ gridColumn: "span 4" }}
                      /> 
                </>
                 )}             

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
              {isLogin ? "LOGIN" : "REGISTRAR"}
            </Button>
            <FlexBetween style={{display:"flex" , justifyContent:"center"}} >
              <a  href="/forgotPassword" underline="none" color="inherit">
                    Esqueci Palavra-Passe?
                </a>
            </FlexBetween>
            <FlexBetween style={{display:"flex" , justifyContent:"center"}}>
                  <Typography
                  
                    onClick={() => {
                      setPageType(isLogin ? "register" : "login");
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
                    {isLogin
                      ? "Criar conta? Cadastrar."
                      : "Ja possui uma conta? Login."}
                  </Typography>
                </FlexBetween>
                  
            
          </Box>
        </form>
      )}
    </Formik>
  );
};


export default Form;