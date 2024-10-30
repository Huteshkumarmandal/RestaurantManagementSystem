// import { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';

// const MenuDetails = () => {
//   const { id } = useParams(); // Get the menu item ID from the URL
//   const [menuItem, setMenuItem] = useState(null);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchMenuItem = async () => {
//       try {
//         const response = await axios.get(`http://localhost:8000/menu/${id}`);
//         setMenuItem(response.data);
//       } catch (error) {
//         setError('Failed to fetch menu item details.');
//         console.error(error);
//       }
//     };

//     fetchMenuItem();
//   }, [id]);

//   if (error) {
//     return <p className="text-red-600">{error}</p>;
//   }

//   if (!menuItem) {
//     return <p>Loading...</p>;
//   }

//   return (
//     <div className="p-6 bg-white rounded-lg shadow-md max-w-4xl mx-auto">
//       <h2 className="text-3xl font-bold text-center mb-4">{menuItem.name}</h2>

//       {/* Image with better design */}
//       <div className="flex justify-center mb-6">
//         <img
//           src={`http://localhost:8000${menuItem.imageUrl}`}
//           alt={menuItem.name}
//           className="w-full md:w-2/3 lg:w-1/2 h-auto object-cover rounded-lg shadow-lg border border-gray-200"
//         />
//       </div>

//       {/* Description and details */}
//       <p className="text-lg text-gray-700 mb-4">{menuItem.description}</p>

//       {/* Price */}
//       <div className="flex items-center justify-between mb-4">
//         <p className="text-xl font-semibold text-gray-900">Price: NRP {menuItem.price}</p>
//         <p className="text-md font-medium text-gray-600">{menuItem.category}</p>
//       </div>

//       {/* Additional Information */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
//         <p className="text-md text-gray-600"><strong>Preparation Time:</strong> {menuItem.preparationTime}</p>
//         <p className="text-md text-gray-600"><strong>Availability:</strong> {menuItem.availability}</p>
//       </div>

//       {/* Tags */}
//       <div className="mt-4">
//         <p className="text-md font-semibold text-gray-800">Tags:</p>
//         <p className="text-md text-gray-600">
//           {Array.isArray(menuItem.tags) ? menuItem.tags.join(', ') : 'No tags available'}
//         </p>
//       </div>
//     </div>
//   );
// };

// export default MenuDetails;


import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const MenuDetails = () => {
  const { id } = useParams(); // Get the menu item ID from the URL
  const [menuItem, setMenuItem] = useState(null);
  const [error, setError] = useState('');
  const [quantity, setQuantity] = useState(1); // State for quantity

  useEffect(() => {
    const fetchMenuItem = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/menu/${id}`);
        setMenuItem(response.data);
      } catch (error) {
        setError('Failed to fetch menu item details.');
        console.error(error);
      }
    };

    fetchMenuItem();
  }, [id]);

  const addToOrder = async () => {
    if (quantity < 1) {
      alert('Please enter a valid quantity.');
      return;
    }

    const orderItem = {
      menu_item_id: menuItem.id,
      quantity,
      price: menuItem.price
    };

    try {
      const response = await axios.post('http://localhost:8000/api/orderssingle', {
        table_number: '5', // Example table number
        order_items: [orderItem],
        payment_status: 'pending',
        order_status: 'pending'
      });
      console.log('Order placed successfully', response.data);
      alert('Item added to order');
    } catch (error) {
      console.error('Error adding to order', error);
      alert('There was an error adding the item to the order.');
    }
  };

  if (error) {
    return <p className="text-red-600">{error}</p>;
  }

  if (!menuItem) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-4">{menuItem.name}</h2>

      {/* Image */}
      <div className="flex justify-center mb-6">
        <img
          src={`http://localhost:8000${menuItem.imageUrl}`}
          alt={menuItem.name}
          className="w-full md:w-2/3 lg:w-1/2 h-auto object-cover rounded-lg shadow-lg border border-gray-200"
        />
      </div>

      {/* Description and details */}
      <p className="text-lg text-gray-700 mb-4">{menuItem.description}</p>

      {/* Price and category */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-xl font-semibold text-gray-900">Price: NRP {menuItem.price}</p>
        <p className="text-md font-medium text-gray-600">{menuItem.category}</p>
      </div>

      {/* Quantity input */}
      <div className="flex items-center mb-4">
        <label className="mr-4">Quantity:</label>
        <input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="border border-gray-300 rounded-md p-1 w-20"
        />
      </div>

      {/* Add to Order button */}
      <button
        onClick={addToOrder}
        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Add to Order
      </button>
    </div>
  );
};

export default MenuDetails;
