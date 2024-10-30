import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login as authLogin } from '../store/authSlice';
import { Button, Input, Logo } from "./index";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import axios from 'axios'; // Use axios to make API requests

function Login() {
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const { register, handleSubmit } = useForm();
   const [error, setError] = useState("");

   // Function to handle login
   const login = async (data) => {
       setError("");

       try {
           // Send login request to backend
           const response = await axios.post('http://localhost:8000/login', data);
           
           console.log("Login Response:", response.data);  // Log response data to the console

           // Assuming response contains user data and token
           const { user, token } = response.data;

           if (user && token) {
               // Store token in localStorage
               localStorage.setItem('token', token);

               // Dispatch login action to Redux
               dispatch(authLogin(user, token));

               // Get user role from user data
               const userRole = user.role; // Assuming the user object contains a role property

               // Navigate based on user role
               if (userRole === 'admin') {
                   navigate("/admin-home"); // Redirect to admin page
               } else if (userRole === 'chef') {
                   navigate("/chef-home"); // Redirect to chef page
               } else {
                   navigate("/customer-home"); // Redirect to customer page
               }
           } else {
               setError("Invalid login response");
           }
       } catch (error) {
           setError(error.response?.data?.message || "An error occurred");
       }
   };

   return (
       <div className='flex items-center justify-center w-full'>
           <div className={`mx-auto w-full max-w-lg bg-green-100 rounded-xl p-10 border border-black/10`}>
               <div className="mb-2 flex justify-center">
                   <span className="inline-block w-full max-w-[100px]">
                       <Logo width="100%" />
                   </span>
               </div>
               <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
               <p className="mt-2 text-center text-base text-black/60">
                   Don&apos;t have an account?&nbsp;
                   <Link
                       to="/signup"
                       className="font-medium text-primary transition-all duration-200 hover:underline"
                   >
                       Sign Up
                   </Link>
               </p>
               {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
               <form onSubmit={handleSubmit(login)} className='mt-8'>
                   <div className='space-y-5'>
                       <Input
                           label="Email: "
                           placeholder="Enter your email"
                           type="email"
                           {...register("email", {
                               required: true,
                               validate: {
                                   matchPattern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                   "Email address must be a valid address",
                               }
                           })}
                       />
                       <Input
                           label="Password: "
                           type="password"
                           placeholder="Enter your password"
                           {...register("password", {
                               required: true,
                           })}
                       />
                       <Button
                           type="submit"
                           className="w-full"
                       >Sign in</Button>
                   </div>
               </form>
           </div>
       </div>
   );
}

export default Login;
