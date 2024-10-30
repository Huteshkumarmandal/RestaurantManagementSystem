import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const OrdersList = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:8000/orders');
        setOrders(response.data);
      } catch (err) {
        setError('Failed to fetch orders.');
        console.error(err);
      }
    };

    fetchOrders();
  }, []);

  if (error) {
    return <p className="text-red-600">{error}</p>;
  }

  if (orders.length === 0) {
    return <p>Loading orders...</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {orders.map((order) => (
        <div key={order.order_id} className="p-4 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-bold">Order ID: {order.order_id}</h2>
          <p>Table: {order.table_number}</p>
          <p>Total: RS. {order.total_amount}</p>
          <p>Status: {order.order_status}</p>
          <Link to={`/orders/${order.order_id}`} className="text-blue-500">View Details</Link>
        </div>
      ))}
    </div>
  );
};

export default OrdersList;
