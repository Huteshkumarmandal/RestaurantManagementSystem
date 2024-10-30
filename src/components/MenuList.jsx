import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MenuCard from './MenuCard';

const MenuList = () => {
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch menu data from the backend
  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/menu');
        setMenus(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchMenus();
  }, []);

  // Handle delete menu item
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/menu/${id}`);
      setMenus(menus.filter(menu => menu.id !== id)); // Remove deleted item from state
    } catch (err) {
      console.error('Error deleting menu:', err.message);
    }
  };

  // Handle update menu item
  const handleUpdate = async (id, updatedData) => {
    try {
      await axios.put(`http://localhost:8000/api/menu/${id}`, updatedData);
      setMenus(
        menus.map(menu => (menu.id === id ? { ...menu, ...updatedData } : menu))
      ); // Update the state with new data
    } catch (err) {
      console.error('Error updating menu:', err.message);
    }
  };

  if (loading) return <p>Loading menus...</p>;
  if (error) return <p>Error fetching menus: {error}</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {menus.length === 0 ? (
        <p>No menu items found.</p>
      ) : (
        menus.map(menu => (
          <MenuCard
            key={menu.id}
            id={menu.id}
            name={menu.name}
            description={menu.description}
            category={menu.category}
            price={menu.price}
            discount={menu.discount}
            availability={menu.availability}
            preparationTime={menu.preparationTime}
            imageUrl={menu.imageUrl}
            tags={menu.tags}
            createdAt={menu.createdAt}
            onDelete={handleDelete} // Pass delete function
            onUpdate={handleUpdate} // Pass update function
          />
        ))
      )}
    </div>
  );
};

export default MenuList;
