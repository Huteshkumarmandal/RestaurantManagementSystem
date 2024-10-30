import 'react';
import { Container, Logo } from '../index';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/authSlice'; // Assuming logout action exists

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const navItems = [
    {
      name: 'Home',
      slug: '/',
      active: true,
    },
    {
      name: 'Login',
      slug: '/login',
      active: true,
    },
    {
      name: 'Signup',
      slug: '/signup',
      active: true,
    },
    // {
    //   name: 'Add Menus',
    //   slug: '/add-menus',
    //   active: true,
    // },
    // {
    //   name: 'Add Order',
    //   slug: '/add-order',
    //   active: true,
    // },
  ];

  const handleLogout = async () => {
    try {
      // Making an API call to log out the user, assuming there's an endpoint for it
      await axios.post('/logout');
      
      // Dispatch the logout action to update Redux state
      dispatch(logout());
      
      // Redirect to login page after logging out
      navigate('/login');
    } catch (error) {
      console.error('Error logging out', error);
    }
  };

  return (
    <header className='py-3 shadow bg-green-500'>
      <Container>
        <nav className='flex items-center'>
          <div className='mr-4'>
            <Link to='/'>
              <Logo width='70px' />
            </Link>
          </div>
          <ul className='flex ml-auto'>
            {navItems.map((item) => (
              <li key={item.name}>
                <button
                  onClick={() => navigate(item.slug)}
                  className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
                >
                  {item.name}
                </button>
              </li>
            ))}

            {/* The logout button is always shown now */}
            <li>
              <button
                onClick={handleLogout}
                className='inline-block px-6 py-2 duration-200 hover:bg-red-100 rounded-full'
              >
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
