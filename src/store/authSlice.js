import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios'; // for making API requests

const initialState = {
    status: false,
    userData: null,
    token: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.status = true;
            state.userData = action.payload.userData; // store user data from MySQL
            state.token = action.payload.token; // store token

            if (state.token) {
                localStorage.setItem('token', state.token); // store token in localStorage
                console.log("Token saved in localStorage:", localStorage.getItem('token')); // Verify token
              } else {
                console.error("Token is undefined, check backend response");
              }
            },

        //       // Log the token and user data for debugging
        //       console.log("Logging in user:", state.userData);
        //       console.log("Token received:", state.token);


        //     localStorage.setItem('token', action.payload.token); // store token in local storage
        //     console.log("Token saved in localStorage:", localStorage.getItem('token')); // Verify token in localStorage

        // },
        logout: (state) => {
            state.status = false;
            state.userData = null;
            state.token = null;
            localStorage.removeItem('token'); // remove token from local storage
        },
        setToken: (state, action) => {
            state.token = action.payload; // utility to set token directly
        },
    },
});

// Fetch user action
export const fetchUserFromMySQL = () => async (dispatch) => {
    try {
        const token = localStorage.getItem('token'); // retrieve token from local storage
        if (token) {


            // Set the token in headers for authentication
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const response = await axios.get('http://localhost:8000/verify-user');
            console.log("Response Data:", response.data);

            if (response.data && response.data.user) {
                dispatch(login({ userData: response.data.user, token })); // Dispatch login with user data and token
            } else {
                dispatch(logout()); // Dispatch logout if no user found
            }
        } else {
            dispatch(logout()); // Dispatch logout if token is not available
        }
    } catch (error) {
        console.error("Error fetching user from MySQL", error);
        dispatch(logout()); // Dispatch logout on error
    }
};

export const { login, logout, setToken } = authSlice.actions;

export default authSlice.reducer;
