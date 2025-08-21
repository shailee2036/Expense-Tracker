import React, { useContext, useState } from 'react'
import AuthLayout from '../../components/Layouts/AuthLayout'
import { Link, useNavigate } from 'react-router-dom'
import Input from '../../components/Inputs/Input'
import SignUp from './SignUp'
import { validateEmail } from '../../utils/helper'
import { UserContext } from '../../context/userContext'
import axiosInstance from '../../utils/axiosInstance'; 
import { API_PATHS } from '../../utils/apiPaths';  
import { GoogleLogin } from '@react-oauth/google';
import CARD from "../../assets/Card.png"

const Login = ()=>{
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const {updateUser} = useContext(UserContext);

  const navigate = useNavigate();

const handleGoogleSuccess = async (credentialResponse) => {
  try {
    console.log('Google login successful:', credentialResponse);
    
    // Use the Google LOGIN endpoint (checks if user exists)
    const response = await axiosInstance.post(API_PATHS.AUTH.GOOGLE_LOGIN, {
      credential: credentialResponse.credential,
    });
    
    const { token, user } = response.data;
    if (token) {
      localStorage.setItem("token", token);
      updateUser(user);
      navigate("/dashboard");
    }
  } catch (error) {
    console.error('Backend authentication error:', error);
    if (error.response && error.response.data && error.response.data.message) {
      setError(error.response.data.message);
    } else {
      setError("Google login failed. Please try again.");
    }
  }
};
  const handleGoogleError = () => {
    console.error('Google Login Failed');
    setError("Google authentication failed. Please try again.");
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if(!validateEmail(email)){
      setError("Please enter a valid email address.");
      return;
    }

    if(!password){
      setError("Please enter the password");
      return;
    }
    setError("");

    //Login API Call
    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });
      const { token, user } = response.data;
      if (token) {
        localStorage.setItem("token", token);
        updateUser(user);
        navigate("/dashboard");
      }
    } catch (error){
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  }


  const loginImage = (
    <div className="w-full h-full flex items-center justify-center bg-gray-100">
     <img src={CARD}
      alt="Expense Tracker" 
      className="w-full h-full object-cover"/>
    </div>
  );

  return(
    <AuthLayout image={loginImage}>
      <div className='lg:w-[70%] h-3/4 mid:h-full flex flex-col justify-center'>
        <h3 className='text-xl font-semibold text-black'>Welcome back</h3>
        <p className='text-xs text-state-700 mt-[5px] mb-6'>
          Please enter details to log in 
        </p>

        <form onSubmit={handleLogin}>
          <Input
            value ={email}
            onChange = {({ target }) => setEmail(target.value)}
            label = "Email Address"
            placeholder = "abc@gmail.com"
            type="text" 
          />

          <Input
            value ={password}
            onChange = {({ target }) => setPassword(target.value)}
            label = "Password"
            placeholder = "Minimum 8 Characters"
            type="password" 
          />
          {error && <p className='text-red-500  text-xs pb-2.5'>{error}</p>}
          <button type='submit' className='btn-primary'>
            LOGIN
          </button>
          
          <div className="mt-6">
            <style>{`
              .google-login-container {
                width: 100% !important;
                display: flex !important;
              }
              .google-login-container > div,
              .google-login-container > div > div,
              .google-login-container iframe,
              .google-login-container [role="button"] {
                width: 100% !important;
                height: 42px !important;
                min-width: 1000px !important;
                max-width: 1000px !important;
              }
              .google-login-container iframe {
                border-radius: 6px !important;
              }
            `}</style>
            <div className="google-login-container w-full">
              <GoogleLogin
                className='btn-primary'
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
                theme="outline"
                size="large"
                width={window.innerWidth || 400}
                text="signin_with"
              />
            </div>
          </div>

          <p className='text--[13px] text-slate-800 mt-3'>
            Don't have an account?{""}
            <Link className='font-medium text-primary underline' to="/signUp">SignUp</Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  )
}
export default Login