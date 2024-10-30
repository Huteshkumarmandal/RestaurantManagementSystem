import React, { useState } from 'react';

function MenuCardView({ 
  id, name, description, category, price, discount, availability, preparationTime, imageUrl, tags, createdAt, 
  onDelete, onUpdate 
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name,
    description,
    category,
    price,
    discount,
    availability,
    preparationTime,
    tags
  });

  const discountedPrice = formData.price - formData.discount;

  // Handle form input changes for updating
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Toggle between view and edit mode
  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  // Submit updated data
  const handleUpdate = () => {
    onUpdate(id, formData);
    setIsEditing(false);
  };

  return (
    <div className='w-full bg-gray-100 rounded-xl p-4'>
      <div className='w-full justify-center mb-4'>
        <img
          src={`http://localhost:8000${imageUrl}`} // Assuming backend serves images from static folder
          alt={name}
          className='rounded-xl'
        />
      </div>
      {!isEditing ? (
        <>
          <h2 className='text-xl font-bold'>{name}</h2>
          <p className='text-gray-700'>Description: {description}</p>
          <p className='text-gray-700'>Category: {category}</p>
          <p className='text-gray-700'>Availability: {availability ? 'Available' : 'Out of Stock'}</p>
          <p className='text-gray-700'>Preparation Time: {preparationTime} minutes</p>
          {/* Fix for tags */}
          <p className='text-gray-700'>Tags: {Array.isArray(tags) ? tags.join(', ') : 'No tags available'}</p>
          <p className='text-gray-500 line-through'>RS. {price}</p>
          <p className='text-green-600'>Discounted Price: RS. {discountedPrice}</p>
          <p className='text-gray-500 text-sm'>Created at: {new Date(createdAt).toLocaleDateString()}</p>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
            onClick={handleEdit}
          >
            Edit
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded mt-2 ml-2"
            onClick={() => onDelete(id)}
          >
            Delete
          </button>
        </>
      ) : (
        <div>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Menu Name"
            className="border rounded px-2 py-1 mb-2 w-full"
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Menu Description"
            className="border rounded px-2 py-1 mb-2 w-full"
          />
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Category"
            className="border rounded px-2 py-1 mb-2 w-full"
          />
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Price"
            className="border rounded px-2 py-1 mb-2 w-full"
          />
          <input
            type="number"
            name="discount"
            value={formData.discount}
            onChange={handleChange}
            placeholder="Discount"
            className="border rounded px-2 py-1 mb-2 w-full"
          />
          <input
            type="text"
            name="availability"
            value={formData.availability}
            onChange={handleChange}
            placeholder="Availability"
            className="border rounded px-2 py-1 mb-2 w-full"
          />
          <input
            type="number"
            name="preparationTime"
            value={formData.preparationTime}
            onChange={handleChange}
            placeholder="Preparation Time"
            className="border rounded px-2 py-1 mb-2 w-full"
          />
          <input
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            placeholder="Tags (comma separated)"
            className="border rounded px-2 py-1 mb-2 w-full"
          />
          <button
            className="bg-green-500 text-white px-4 py-2 rounded mt-2"
            onClick={handleUpdate}
          >
            Save
          </button>
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded mt-2 ml-2"
            onClick={handleEdit}
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}

export default MenuCardView;
