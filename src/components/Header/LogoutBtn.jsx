import 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios'; // Import axios for making API calls
import { logout } from '../../store/authSlice';

function LogoutBtn() {
    const dispatch = useDispatch();

    const logoutHandler = async () => {
        try {
            // API call to your backend logout endpoint
            await axios.post('/api/auth/logout');

            // Dispatch the logout action to update the Redux state
            dispatch(logout());
        } catch (error) {
            console.error('Logout failed: ', error);
        }
    };

    return (
        <button
            className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
            onClick={logoutHandler}
        >
            Logout
        </button>
    );
}

export default LogoutBtn;
