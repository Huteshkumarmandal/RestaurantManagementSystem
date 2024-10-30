import 'react';
import { Container, Logo, LogoutBtn} from '../index';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { logout } from '../../store/authSlice'; // Assuming logout action exists

function Header() {
  const authStatus = useSelector((state) => state.auth.Status);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const navItems = [
    {
      name: 'Home',
      slug: '/admin-home',
      active: true,
    },
    {
      name: 'Login',
      slug: '/login',
      active: !authStatus,
    },
    
   
    {
      name: 'All Menus',
      slug: '/all-menus',
      active: !authStatus,
    },

    {
      name: 'Add-Order',
      slug: '/add-order',
      active: !authStatus,
    },


    

   
  ];

  const handleLogout = async () => {
    try {
      // Making an API call to log out the user, assuming there's an endpoint for it
      await axios.post('/api/auth/logout');
      
      // Dispatch the logout action to update Redux state
      dispatch(logout());
      
      // Redirect to login page after logging out
      navigate('/login');
    } catch (error) {
      console.error('Error logging out', error);
    }
  };

  return (
    <header className='py-3 shadow  bg-green-500'>
      <Container>
        <nav className='flex items-center'>
          <div className='mr-4'>
            <Link to='/'>
              <Logo width='70px' />
            </Link>
          </div>
          <ul className='flex ml-auto'>
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}

            {authStatus && (
              <li>
                {/* Use handleLogout to log out and update the state */}
                <button
                  onClick={handleLogout}
                  className='inline-block px-6 py-2 duration-200 hover:bg-red-100 rounded-full'
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
