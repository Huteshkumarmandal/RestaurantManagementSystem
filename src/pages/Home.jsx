import { useEffect, useState } from 'react';
import axios from 'axios'; 
import Container from '../components/container/Container'; // Adjust the path as needed
import MenuCard from '../components/MenuCard'; // Adjust the path as needed
import { useNavigate } from 'react-router-dom'; // Import useNavigate from 'react-router-dom'

function Home() {
    const [menus, setMenus] = useState([]);
    const [loading, setLoading] = useState(true); // Loading state
    const navigate = useNavigate(); // Initialize the navigate function

    // Check if user is logged in
    const isLoggedIn = () => {
        return localStorage.getItem('token') !== null;
    };

    // Decode JWT to get the user role
    const getUserRole = () => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decoded = JSON.parse(atob(token.split('.')[1])); // Decode JWT to get role info (assuming JWT structure)
                return decoded.role; // Extract the role (modify based on your token structure)
            } catch (error) {
                console.error("Failed to decode token:", error);
                return null;
            }
        }
        return null;
    };

    useEffect(() => {
        if (!isLoggedIn()) {
            return navigate('/login'); // Redirect to login if not logged in
        }

        const role = getUserRole(); // Get user role from token
        if (role === 'admin') {
            return navigate('/admin-home'); // Redirect to admin home if role is admin
        } else if (role === 'chef') {
            return navigate('/chef-home'); // Redirect to chef home if role is chef
        } else if (role === 'customer') {
            // No need to navigate anywhere if role is customer
        }

        const fetchMenus = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/menu'); 
                setMenus(response.data); 
            } catch (error) {
                console.error('Error fetching menus:', error);
            } finally {
                setLoading(false); // Set loading to false after fetching
            }
        };

        fetchMenus();
    }, [navigate]);

    // Loading UI
    if (loading) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap justify-center">
                        <h1 className="text-2xl font-bold">Loading menus...</h1>
                    </div>
                </Container>
            </div>
        );
    }

    // If no menus are found
    if (menus.length === 0) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap justify-center">
                        <h1 className="text-2xl font-bold">No menus available.</h1>
                    </div>
                </Container>
            </div>
        );
    }

    // Main UI
    return (
        <div className="w-full py-8">
            <Container>
                <div className="flex flex-wrap justify-center">
                    {menus.map((menuItem) => (
                        <div key={menuItem.id} className="p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
                            <MenuCard {...menuItem} /> {/* Spread props for MenuCard */}
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
}

export default Home;
