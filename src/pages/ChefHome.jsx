import { useEffect, useState } from 'react';
import axios from 'axios'; 
import Container from '../components/container/Container'; // Adjust the path as needed
import MenuCard from '../components/MenuCard'; // Adjust the path as needed
import ChefHeader from '../components/Header/AdminHeader'
import { useNavigate } from 'react-router-dom'; // Assuming you're using react-router for navigation

function ChefHome() {
    const [menus, setMenus] = useState([]);
    const [menuCount, setMenuCount] = useState(0);
    const [orderCount, setOrderCount] = useState(0);
    const navigate = useNavigate(); // Initialize navigate


    useEffect(() => {

         // Check if the user is logged in by looking for the token in localStorage
         const token = localStorage.getItem('token');
         if (!token) {
             navigate('/login'); // Redirect to login page if token is not found
             return;
         }


        const fetchMenus = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/menu'); 
                setMenus(response.data); 
            } catch (error) {
                console.error('Error fetching menus:', error);
            }
        };

        const fetchCounts = async () => {
            try {
                const menuResponse = await axios.get('http://localhost:8000/api/admin/menu/count'); // Adjust API endpoint
                setMenuCount(menuResponse.data.count); // Assuming the count is in the response
            } catch (error) {
                console.error('Error fetching menu count:', error);
            }

            try {
                const orderResponse = await axios.get('http://localhost:8000/api/admin/orders/count'); // Adjust API endpoint
                setOrderCount(orderResponse.data.count); // Assuming the count is in the response
            } catch (error) {
                console.error('Error fetching order count:', error);
            }
        };

        fetchMenus();
        fetchCounts();
    }, [navigate]);

     // Define onClick handlers for navigation
     const handleMenuClick = () => {
        navigate('/menu-card-view'); // Navigate to the menus page
    };

    const handleOrderClick = () => {
        navigate('/orders-list'); // Navigate to the orders page
    };

    if (menus.length === 0) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>

                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                Please Login to view admin dashboard.
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        );
    }
    
    return (
        <div className='w-full py-8'>
                            <ChefHeader/>

            <Container>
                <div className='flex flex-wrap mb-4'>
                    {/* Display Total Menu Count */}
                    <div className='p-2 w-1/3'>
                        <div className='bg-green-100 p-4 rounded-lg shadow-md text-center' onClick={handleMenuClick} >

                            <h2 className='text-xl font-bold'>Total Menus</h2>
                            <p className='text-2xl'>{menuCount}</p>
                        </div>
                    </div>
                    {/* Display Total Order Count */}
                    <div className='p-2 w-1/3'>
                        <div className='bg-blue-100 p-4 rounded-lg shadow-md text-center'onClick={handleOrderClick} // Add onClick event
                        >
                            <h2 className='text-xl font-bold'>Total Orders</h2>
                            <p className='text-2xl'>{orderCount}</p>
                        </div>
                    </div>
                </div>
                <div className='flex flex-wrap'>
                    {menus.map((post) => (
                        <div key={post.id} className='p-2 w-1/4'>
                            <MenuCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
}

export default ChefHome;
