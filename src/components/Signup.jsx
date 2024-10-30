import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { login } from '../store/authSlice';
import { Button, Input, Logo } from './index.js';
import axios from 'axios';

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState('');

  const { register, handleSubmit, formState: { errors }, watch } = useForm();

  // Watch the avatar field to correctly handle file input
  const avatarFile = watch('avatar');

  const create = async (data) => {
    setError('');

    const formData = new FormData();
    formData.append('fullName', data.fullName);
    formData.append('username', data.username);
    formData.append('email', data.email);
    formData.append('password', data.password);
    formData.append('role', data.role);

    // Check if avatar is selected before appending it to the formData
    if (avatarFile && avatarFile.length > 0) {
      formData.append('avatar', avatarFile[0]);
    } else {
      setError('Avatar is required');
      return; // Stop the function if no avatar is selected
    }

    formData.append('address', data.address);
    formData.append('phoneNumber', data.phoneNumber);

    // Log FormData contents to check if data is loaded correctly
    for (let pair of formData.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
    }

    try {
      const response = await axios.post('http://localhost:8000/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log(response.data); // Check the response structure here


        // Check if the backend sent back an avatar URL and log it
    if (userData.avatarUrl) {
      console.log('Avatar uploaded successfully:', userData.avatarUrl);
    } else {
      console.log('No avatar URL returned.');
    }

      const userData = response.data.data;
      dispatch(login(userData));
      navigate('/');
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message || 'An error occurred.');
      } else if (error.request) {
        setError('No response from server. Please try again later.');
      } else {
        setError('Error: ' + error.message);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="mx-auto w-full max-w-lg bg-white rounded-lg p-8 shadow-lg border border-gray-200">
        <div className="mb-6 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-3xl font-bold leading-tight text-gray-900">
          Sign up to create an account
        </h2>
        <p className="mt-2 text-center text-gray-600">
          Already have an account?&nbsp;
          <Link to="/login" className="text-blue-600 hover:underline">
            Sign In
          </Link>
        </p>

        {error && <p className="text-red-600 text-center mt-4">{error}</p>}

        <form onSubmit={handleSubmit(create)} className="space-y-6 mt-6" encType="multipart/form-data">
          <Input
            label="Full Name"
            placeholder="Enter your full name"
            {...register('fullName', { required: 'Full name is required' })}
            error={errors.fullName}
          />
          <Input
            label="Username"
            placeholder="Enter your username"
            {...register('username', { required: 'Username is required' })}
            error={errors.username}
          />
          <Input
            label="Email"
            type="email"
            placeholder="Enter your email"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                message: 'Please enter a valid email',
              },
            })}
            error={errors.email}
          />
          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters',
              },
            })}
            error={errors.password}
          />
          <div>
            <label className="block text-sm font-medium text-gray-700">Role</label>
            <select
              {...register('role', { required: 'Role is required' })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-700"
            >
              <option value="">Select your role</option>
              <option value="chef">Chef</option>
              <option value="restaurant_manager">Restaurant Manager</option>
              <option value="customer">Customer</option>
            </select>
            {errors.role && <p className="text-red-600 text-sm mt-1">{errors.role.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Avatar</label>
            <input
              type="file"
              accept="image/*" 
              {...register('avatar', { required: 'Avatar is required' })}
              className="mt-1 block w-full text-sm text-gray-500
                         file:mr-4 file:py-2 file:px-4
                         file:rounded-full file:border-0
                         file:text-sm file:font-semibold
                         file:bg-blue-50 file:text-blue-700
                         hover:file:bg-blue-100"
            />
            {errors.avatar && <p className="text-red-600 text-sm mt-1">{errors.avatar.message}</p>}
          </div>
          <Input
            label="Address"
            placeholder="Enter your address"
            {...register('address')}
            error={errors.address}
          />
          <Input
            label="Phone Number"
            placeholder="Enter your phone number"
            {...register('phoneNumber')}
            error={errors.phoneNumber}
          />
          <Button type="submit" className="w-full bg-blue-600 text-white">
            Create Account
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
