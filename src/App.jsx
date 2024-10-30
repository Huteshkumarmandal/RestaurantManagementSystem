// import { useState, useEffect } from 'react';
// import { useDispatch } from 'react-redux';
// import './App.css';
// import { login, logout } from "./store/authSlice";
// import { Footer } from './components';
// import { Outlet } from 'react-router-dom';
// import axios from 'axios';

// function App() {
//   const [loading, setLoading] = useState(true);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     // Fetch token from localStorage and verify current user
//     const token = localStorage.getItem('token');
//     if (token) {
//       axios.defaults.headers.common['Authorization'] = `Bearer ${token}`; // Set Authorization header
//       axios.get('http://localhost:8000/current-user')
//         .then((response) => {
//           const userData = response.data.user; // extract user from response
//           if (userData && token) {
//             dispatch(login({ userData, token })); // pass userData and token to login
//           } else {
//             dispatch(logout());
//           }
//         })
//         .catch(() => {
//           dispatch(logout());
//         })
//         .finally(() => setLoading(false));
//     } else {
//       dispatch(logout());
//       setLoading(false);
//     }
//   }, [dispatch]);

//   return !loading ? (
//     <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
//       <div className='w-full block'>
//         {/* <Header /> */}
//         <main>
//           Restaurant Management System  <Outlet />
//         </main>
//         <Footer />
//       </div>
//     </div>
//   ) : null;
// }

// export default App;




import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './App.css';
import { login, logout } from "./store/authSlice";
import { Footer } from './components';
import { Outlet } from 'react-router-dom';
import axios from 'axios';

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch token from localStorage and verify current user
    const token = localStorage.getItem('token');

    const verifyUser = async () => {
      if (token) {
        // Set Authorization header for API requests
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        
        try {
          const response = await axios.get('http://localhost:8000/current-user');
          const userData = response.data.user; // Extract user from response
          
          if (userData) {
            // Dispatch login with user data and token if user data exists
            dispatch(login({ userData, token }));
          } else {
            // Logout if no user data is returned
            dispatch(logout());
          }
        } catch (error) {
          console.error("Error fetching current user:", error);
          dispatch(logout()); // Logout on error
        } finally {
          setLoading(false); // Set loading to false after attempt
        }
      } else {
        dispatch(logout()); // Logout if token is not found
        setLoading(false); // Set loading to false if no token
      }
    };

    verifyUser(); // Call the verifyUser function
  }, [dispatch]);

  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        {/* <Header /> */}
        <main>
          <h1>Restaurant Management System</h1>
          <Outlet /> {/* Render child routes here */}
        </main>
        <Footer />
      </div>
    </div>
  ) : null; // Render nothing while loading
}

export default App;
