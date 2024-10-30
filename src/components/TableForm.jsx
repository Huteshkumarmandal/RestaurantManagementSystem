import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const TableForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [image, setImage] = useState(null);

  const onSubmit = async (data) => {
    try {
      // Create a FormData object to handle file upload (if any)
      const formData = new FormData();
      formData.append('table_number', data.table_number);
      formData.append('seating_capacity', data.seating_capacity);
      formData.append('status', data.status);
      formData.append('order_id', data.order_id || '');  // Optional
      formData.append('assigned_waiter_id', data.assigned_waiter_id || '');  // Optional
      formData.append('special_requests', data.special_requests || '');
      if (image) formData.append('table_image', image);

      // Send a POST request to the backend to add the table
      const response = await axios.post('http://localhost:5000/api/tables/add-table', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Check the response and show success message
      if (response.status === 201) {
        alert('Table added successfully');
      } else {
        alert('Failed to add table');
      }
    } catch (error) {
      console.error('Error adding table:', error);
      alert('Failed to add table. Please try again later.');
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
      <div>
        <label>Table Number:</label>
        <input
          type="text"
          {...register('table_number', { required: true })}
        />
        {errors.table_number && <span>This field is required</span>}
      </div>

      <div>
        <label>Seating Capacity:</label>
        <input
          type="number"
          {...register('seating_capacity', { required: true })}
        />
        {errors.seating_capacity && <span>This field is required</span>}
      </div>

      <div>
        <label>Status:</label>
        <select {...register('status', { required: true })}>
          <option value="Available">Available</option>
          <option value="Occupied">Occupied</option>
          <option value="Reserved">Reserved</option>
          <option value="Under Maintenance">Under Maintenance</option>
        </select>
      </div>

      <div>
        <label>Order ID (optional):</label>
        <input
          type="number"
          {...register('order_id')}
        />
      </div>

      <div>
        <label>Assigned Waiter ID (optional):</label>
        <input
          type="number"
          {...register('assigned_waiter_id')}
        />
      </div>

      <div>
        <label>Special Requests:</label>
        <textarea {...register('special_requests')} />
      </div>

      <div>
        <label>Table Image (optional):</label>
        <input
          type="file"
          onChange={handleImageChange}
        />
      </div>

      <button type="submit">Add Table</button>
    </form>
  );
};

export default TableForm;
