import React from 'react'
import{
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import Home from "./pages/Dashboard/Home";
import Income from "./pages/Dashboard/Income";
import Expense from "./pages/Dashboard/Expense";
import UserProvider from './context/userContext';
import {Toaster} from "react-hot-toast";
import { DarkModeProvider } from "./context/DarkModeContext";


const App=()=>{
  return(
    
    <UserProvider>
       <DarkModeProvider>
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Root/>}/>
          <Route path='/login' exact element={<Login/>}/>
          <Route path='/signUp' exact element={<SignUp/>}/>
          <Route path='/dashboard' exact element={<Home/>}/>
          <Route path='/income' exact element={<Income/>}/>
          <Route path='/expense' exact element={<Expense/>}/>
        </Routes>
      </Router>
    </div>

    <Toaster toastOptions={{
      className:"",
      style:{
        fontSize:'13px'
      },

    }}
    />
    </DarkModeProvider>
    </UserProvider>
    
  );
};
export default App;
const Root = () =>{
  const isAuthenticated = !!localStorage.getItem("token");
  return isAuthenticated?(
    <Navigate to ="/dashboard"/>
  ):(
    <Navigate to= "/login"/>
  );
};
