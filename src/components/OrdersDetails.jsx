import  { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const OrderDetails = () => {
  const { id } = useParams(); // Get the order ID from the URL
  const [order, setOrder] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/orders/${id}`);
        setOrder(response.data);
      } catch (error) {
        setError('Failed to fetch order details.');
        console.error(error);
      }
    };

    fetchOrderDetails();
  }, [id]);

  if (error) {
    return <p className="text-red-600">{error}</p>;
  }

  if (!order) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-4">Order ID: {order[0].order_id}</h2>

      {/* Order Details */}
      <p><strong>Table Number:</strong> {order[0].table_number}</p>
      <p><strong>Subtotal:</strong> RS. {order[0].subtotal}</p>
      <p><strong>Tax:</strong> RS. {order[0].tax}</p>
      <p><strong>Discount:</strong> RS. {order[0].discount}</p>
      <p><strong>Total Amount:</strong> RS. {order[0].total_amount}</p>
      <p><strong>Status:</strong> {order[0].order_status}</p>

      {/* Menu Items */}
      <h3 className="text-2xl font-semibold mt-6">Menu Items:</h3>
      <ul>
        {order.map((item) => (
          <li key={item.menu_item_name} className="border-b py-2">
            <p><strong>{item.menu_item_name}</strong></p>
            <p>Price: RS. {item.menu_item_price}</p>
            <p>Quantity: {item.quantity}</p>
            <p>Total: RS. {item.total_price_for_item}</p>
          </li>
        ))}
      </ul>

      {/* Payment Details */}
      <h3 className="text-2xl font-semibold mt-6">Payment Details:</h3>
      {order[0].payment_amount ? (
        <div>
          <p><strong>Payment Amount:</strong> RS. {order[0].payment_amount}</p>
          <p><strong>Payment Method:</strong> {order[0].payment_method}</p>
          <p><strong>Payment Status:</strong> {order[0].payment_status}</p>
          <p><strong>Tips:</strong> RS. {order[0].tips}</p>
        </div>
      ) : (
        <p>No payment information available.</p>
      )}
    </div>
  );
};

export default OrderDetails;
