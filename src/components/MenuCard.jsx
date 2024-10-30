import  'react';
import { Link } from 'react-router-dom';

function MenuCard({ id, name, description, price, discount, imageUrl }) {
  const discountedPrice = price - discount;

  return (
    <Link to={`/menu-details/${id}`}>
      <div className='w-full bg-gray-100 rounded-xl p-4'>
        <div className='w-full justify-center mb-4'>
          <img
            src={`http://localhost:8000${imageUrl}`} // Assuming your backend serves images from a static folder
            alt={name}
            className='rounded-xl'
            
          />
          
        </div>
        <h2 className='text-xl font-bold'>{name}</h2>
        <p className='text-gray-700'>{description}</p>
        <p className='text-gray-500 line-through'>RS.{price}</p>
        <p className='text-green-600'>Discounted Price:RS. {discountedPrice}</p>
      </div>
    </Link>
  );
}

export default MenuCard;
