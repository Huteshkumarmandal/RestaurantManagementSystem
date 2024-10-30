import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AuthLayout = ({ children }) => {
    const navigate = useNavigate();
    const [loader, setLoader] = useState(true);

    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                const token = localStorage.getItem('token'); // Assuming the JWT token is stored in localStorage

                if (token) {
                    // Optionally verify the token with the backend
                    await axios.get('http://localhost:8000/verify-token', {
                        headers: {
                            Authorization: `Bearer ${token}`, // Add 'Bearer ' before the token
                        },
                    });
                }
                // If the token exists, you can choose to set a flag or do nothing
                
            } catch (error) {
                console.error('Error during authentication check:', error.message || error);
                localStorage.removeItem('token'); // Clear token in case of error
            }
            setLoader(false); // End the loading state once the check is done
        };

        checkAuthStatus();
    }, []);

    return loader ? <h1>Loading...</h1> : <>{children}</>; // Show loading state until check is done
};

export default AuthLayout;
