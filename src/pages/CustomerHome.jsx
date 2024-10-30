import { useEffect, useState } from 'react';
import axios from 'axios'; 
import Container from '../components/container/Container'; // Adjust the path as needed
import MenuCard from '../components/MenuCard'; // Adjust the path as needed
import { CustomerHeader } from '../components';


function Home() {
    const [menus, setMenus] = useState([]);

    useEffect(() => {
        const fetchMenus = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/menu'); 
                setMenus(response.data); 
            } catch (error) {
                console.error('Error fetching menus:', error);
            }
        };

        fetchMenus();
    }, []);

    if (menus.length === 0) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                Please Login for .....
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        );
    }
    
    return (
        <div className='w-full py-8'>
            <CustomerHeader/>
            <Container>
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

export default Home;
