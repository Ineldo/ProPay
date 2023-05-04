import{BrowserRouter, Navigate, Routes, Route} from 'react-router-dom';
import {useMemo} from 'react';
import {useSelector} from 'react-redux';
import {createTheme} from '@mui/material/styles';
import {CssBaseline, ThemeProvider} from '@mui/material';
import {themeSettings} from './theme';
import LoginPage from 'scenes/loginPage';
import HomePage from 'scenes/homePage';
import Historico from 'scenes/historico';
import Details from 'scenes/historico/details';
import Pagamento from 'scenes/payment';
import Converter from 'scenes/converter/index';
import AdicionarConta from 'scenes/adicionarConta'
import Transacoes from 'scenes/transation';
import RequireAuth from "components/Auth/RequireAuth";
import FormPassword from "scenes/ForgotPassword/forgotPassword"
import SendEmailFom from "scenes/ForgotPassword/sendEmail"



const App = () => {
  const mode= useSelector((state)=> state.mode); 
  const theme= useMemo(()=> createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state)=> state.token));
  return (
    <div className="app">
    <BrowserRouter>
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <Routes>
        <Route path="/" element={<LoginPage/>}/>
        <Route path="/forgotPassword" element={<SendEmailFom/>}/>
        <Route path="/resetPassword" element={<FormPassword/>}/>
        <Route  exact path="/home" element={isAuth ? <HomePage/> : <Navigate to="/"/> }/>
        <Route path="/historico"  element={isAuth ? <Historico/> : <Navigate to="/"/> } />
        <Route path="/historico-details"  element={isAuth ? <Details/> : <Navigate to="/"/> } />
        <Route path="/converter"  element={isAuth ? <Converter/> : <Navigate to="/"/> } />
        <Route path="/pagamento" element={isAuth ? <Pagamento/> : <Navigate to="/"/> } />
        <Route path="/add-account" element={isAuth ? <AdicionarConta/> : <Navigate to="/"/> } />
        <Route path="/transacoes" element={isAuth ? <Transacoes/> : <Navigate to="/"/> } />

      </Routes>
      </ThemeProvider>
    </BrowserRouter>
    </div>
    
  );
}

export default App;
