import React, { useState } from 'react' 
import AuthLayout from '../../components/Layouts/AuthLayout'; 
import ProfilePhotoSelector from '../../components/Inputs/ProfilePhotoSelector'; 
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../components/Inputs/Input'
import { validateEmail } from '../../utils/helper'
import Login from './Login' 
import { useContext } from 'react'; 
import { UserContext } from '../../context/userContext'; 
import uploadImage from '../../utils/uploadImage'; 
import axiosInstance from '../../utils/axiosInstance'; 
import { API_PATHS } from '../../utils/apiPaths'; 
import { GoogleLogin } from '@react-oauth/google'; 
import CARD from "../../assets/Card.png"


const SignUp = () => { const [profilePic, setProfilePic] = useState(null); 
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null); 
  const { updateUser } = useContext(UserContext); const navigate = useNavigate(); 

 // Handle Google Sign-In Success 
const handleGoogleSuccess = async (credentialResponse) => { 
  try { 
    setError(""); 
    console.log('Google credential received:', credentialResponse); 
    
    // Use the Google SIGNUP endpoint
    const response = await axiosInstance.post(API_PATHS.AUTH.GOOGLE_SIGNUP, { 
      credential: credentialResponse.credential 
    }); 
    
    console.log('Backend response:', response.data); 
    const { token, user } = response.data; 
    if (token) { 
      localStorage.setItem("token", token); 
      updateUser(user); 
      navigate("/dashboard"); 
    } 
  } catch (error) { 
    console.error('Full Google signup error:', error);
    console.error('Error response:', error.response);
    console.error('Error message:', error.message);
    console.error('Error code:', error.code);
    console.error('Google signup error:', error); 
    if (error.response && error.response.data && error.response.data.message) { 
      setError(error.response.data.message); 
    } else { 
      setError("Google signup failed. Please try again.");
    } 
  } 
};
            
  // Handle Google Sign-In Error 
  const handleGoogleError = () => { console.log('Google Login Failed'); 
    setError("Google sign-in failed. Please try again."); }; 
    const handleSignUp = async (e) => {
      e.preventDefault(); let profileImageURL = ''; 
                 if (!fullName) 
                  { setError('Please enter full name'); 
                    return; 
                 } if (!validateEmail(email)) 
                  { setError('Please enter a valid email address'); 
                    return; 
                  } if (!password) 
                    { setError('Please enter the password'); 
                      return; 
                    } setError(""); 
              // SignUp API Call 
              try 
              { 
                if (profilePic) 
                { const imgUploadRes = await uploadImage(profilePic); 
                  profileImageURL = imgUploadRes.imageURL || ""; } 
                  const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, 
                    { fullName, email, password, profileImageURL }); 
                    const { token, user } = response.data; 
                    if (token) { localStorage.setItem("token", token); 
                      updateUser(user); navigate("/dashboard"); } } 
                      catch (error) { if (error.response && error.response.data.message) {
                         setError(error.response.data.message); } 
                         else { setError("Something went wrong. Please try again."); } } };


                  const loginImage = (
                    <div className="w-full h-full flex items-center justify-center bg-gray-100">
                     <img src={CARD}
                      alt="Expense Tracker" 
                      className="w-full h-full object-cover"/>
                    </div>
                  );
                          return ( 
                          <AuthLayout image={loginImage}> 
                            <div className='lg:w-[100%] h-auto mid:h-full mt-10 md:mt-0 flex flex-col justify-center'>
                               <h3 className='text-xl font-semibold text-black'>Create Account</h3>
                                <p className='text-xs text-state-700 mt-[5px] mb-6'> 
                                  Join us today by entering your details below
                                </p> 
                                <form onSubmit={handleSignUp}> 
                                  <ProfilePhotoSelector image={profilePic} setImage={setProfilePic}/>
                                   <div className='grid grid-cols-1 md:grid-cols-2 gap-4'> 
                                    <Input 
                                    value={fullName} 
                                    onChange={({ target }) => setFullName(target.value)} 
                                    label="Full Name" 
                                    placeholder="Your name" 
                                    type="text" /> 
                                    
                                    
                                    <Input 
                                    value={email} onChange={({ target }) => setEmail(target.value)}
                                    
                                    label="Email Address" placeholder="abc@gmail.com" type="text" /> 
                                    <div className='col-span-2'> <Input value={password} onChange={({ target }) => 
                                    setPassword(target.value)} label="Password" placeholder="Minimum 8 Characters"
                                     type="password" /> </div> </div> {error && <p className='text-red-500 text-xs pb-2.5'>
                                      {error}</p>} <button type='submit' className='btn-primary'> SIGN UP </button> 


                                      {/* <GoogleLogin
                                      className='btn-google'
                                       onSuccess={handleGoogleSuccess} 
                                       onError={handleGoogleError} 
                                       useOneTap={false} size="large"
                                        width="100%" text="signup_with" />  */}


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



                                        <p className='text-[13px] text-slate-800 mt-3'> 
                                          Already have an account?{" "} 
                                          <Link className='font-medium text-primary underline' to="/login">Login</Link> </p> </form> </div> </AuthLayout> ) } 
              export default SignUp

  

