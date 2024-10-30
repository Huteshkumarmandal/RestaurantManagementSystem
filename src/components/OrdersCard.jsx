import React, { useState, useEffect } from 'react';
import axios from 'axios';

// OrdersCard Component to display individual order card
const OrdersCard = ({ order, onClick, onUpdate, onDelete }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4 cursor-pointer hover:bg-gray-100 transition">
      <h2 className="text-lg font-semibold">Order ID: {order.order_id}</h2>
      <p>Customer ID: {order.customer_id}</p>
      <p>Table: {order.table_number}</p>
      <p>Status: {order.order_status}</p>
      <p>Payment: {order.payment_status}</p>
      <div className="flex justify-between mt-4">
        <button 
          className="text-blue-500 hover:text-blue-700" 
          onClick={() => onClick(order.order_id)}
        >
          View Details
        </button>
        <button 
          className="text-green-500 hover:text-green-700" 
          onClick={() => onUpdate(order)}
        >
          Update
        </button>
        <button 
          className="text-red-500 hover:text-red-700" 
          onClick={() => onDelete(order.order_id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

// OrderDetails Component to display order items for a selected order
const OrderDetails = ({ orderId }) => {
  const [orderItems, setOrderItems] = useState([]);

  useEffect(() => {
    if (orderId) {
      axios.get(`http://localhost:8000/orders/items/${orderId}`)
        .then((response) => {
          setOrderItems(response.data);
        })
        .catch((error) => {
          console.error("Error fetching order items:", error);
        });
    }
  }, [orderId]);

  return (
    <div className="mt-6">
      <h3 className="text-xl font-semibold mb-4">Order Items</h3>
      {orderItems.length > 0 ? (
        <ul className="space-y-4">
          {orderItems.map((item) => (
            <li key={item.item_id} className="border p-4 rounded-lg shadow">
              <p><strong>Item ID:</strong> {item.item_id}</p>
              <p><strong>Quantity:</strong> {item.quantity}</p>
              <p><strong>Subtotal:</strong> ${item.subtotal}</p>
              <p><strong>Tax:</strong> ${item.tax}</p>
              <p><strong>Discount:</strong> ${item.discount}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No items found for this order.</p>
      )}
    </div>
  );
};

// UpdateOrderModal Component for updating an order
const UpdateOrderModal = ({ order, onClose, onSave }) => {
  const [updatedOrder, setUpdatedOrder] = useState(order);

  const handleChange = (e) => {
    setUpdatedOrder({ ...updatedOrder, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onSave(updatedOrder);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h2 className="text-xl font-bold mb-4">Update Order</h2>
        <div className="mb-4">
          <label className="block text-sm">Order Status:</label>
          <input
            type="text"
            name="order_status"
            value={updatedOrder.order_status}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm">Payment Status:</label>
          <input
            type="text"
            name="payment_status"
            value={updatedOrder.payment_status}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="flex justify-end">
          <button
            className="mr-2 px-4 py-2 bg-gray-300 rounded"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={handleSubmit}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

// Main component to display orders and order details on click
const OrdersList = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [orderToUpdate, setOrderToUpdate] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8000/orders')
      .then((response) => {
        setOrders(response.data);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
      });
  }, []);

  const handleOrderClick = (orderId) => {
    setSelectedOrderId(orderId);
  };

  const handleOrderUpdate = (order) => {
    setOrderToUpdate(order);
    setShowUpdateModal(true);
  };

  const handleOrderSave = (updatedOrder) => {
    axios.put(`http://localhost:8000/orders/${updatedOrder.order_id}`, updatedOrder)
      .then(() => {
        setOrders(orders.map((order) =>
          order.order_id === updatedOrder.order_id ? updatedOrder : order
        ));
        setShowUpdateModal(false);
      })
      .catch((error) => {
        console.error("Error updating order:", error);
      });
  };

  const handleOrderDelete = (orderId) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      axios.delete(`http://localhost:8000/orders/${orderId}`)
        .then(() => {
          setOrders(orders.filter(order => order.order_id !== orderId));
        })
        .catch((error) => {
          console.error("Error deleting order:", error);
        });
    }
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold my-8">Orders List</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {orders.map((order) => (
          <OrdersCard 
            key={order.order_id} 
            order={order} 
            onClick={handleOrderClick} 
            onUpdate={handleOrderUpdate} 
            onDelete={handleOrderDelete} 
          />
        ))}
      </div>
      {selectedOrderId && <OrderDetails orderId={selectedOrderId} />}
      {showUpdateModal && (
        <UpdateOrderModal
          order={orderToUpdate}
          onClose={() => setShowUpdateModal(false)}
          onSave={handleOrderSave}
        />
      )}
    </div>
  );
};

export default OrdersList;
