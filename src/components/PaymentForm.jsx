import  { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

function PaymentForm() {
  const [error, setError] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setError('');

    try {
      const response = await axios.post('http://localhost:8000/payment', data);
      console.log('Payment submitted successfully:', response.data);
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message || 'An error occurred while processing the payment.');
      } else {
        setError('Error: ' + err.message);
      }
    }
  };

  return (
    <div className="payment-form-container max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-center text-2xl font-bold mb-6">Payment Form</h2>
      {error && <p className="text-red-600 text-center">{error}</p>}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label htmlFor="order_id" className="block mb-1 font-semibold">Order ID:</label>
          <input
            type="number"
            id="order_id"
            {...register('order_id', { required: 'Order ID is required' })}
            className={`mt-1 block w-full border ${errors.order_id ? 'border-red-500' : 'border-gray-300'} rounded-lg h-10 px-3 transition-colors duration-200 focus:outline-none focus:ring focus:ring-blue-500`}
          />
          {errors.order_id && <p className="text-red-600 text-sm">{errors.order_id.message}</p>}
        </div>

        <div>
          <label htmlFor="payment_date" className="block mb-1 font-semibold">Payment Date:</label>
          <input
            type="datetime-local"
            id="payment_date"
            {...register('payment_date', { required: 'Payment date is required' })}
            className={`mt-1 block w-full border ${errors.payment_date ? 'border-red-500' : 'border-gray-300'} rounded-lg h-10 px-3 transition-colors duration-200 focus:outline-none focus:ring focus:ring-blue-500`}
          />
          {errors.payment_date && <p className="text-red-600 text-sm">{errors.payment_date.message}</p>}
        </div>

        <div>
          <label htmlFor="payment_amount" className="block mb-1 font-semibold">Amount:</label>
          <input
            type="number"
            id="payment_amount"
            step="0.01"
            {...register('payment_amount', { required: 'Amount is required' })}
            className={`mt-1 block w-full border ${errors.payment_amount ? 'border-red-500' : 'border-gray-300'} rounded-lg h-10 px-3 transition-colors duration-200 focus:outline-none focus:ring focus:ring-blue-500`}
          />
          {errors.payment_amount && <p className="text-red-600 text-sm">{errors.payment_amount.message}</p>}
        </div>

        <div>
          <label htmlFor="payment_method" className="block mb-1 font-semibold">Payment Method:</label>
          <select
            id="payment_method"
            {...register('payment_method', { required: 'Payment method is required' })}
            className={`mt-1 block w-full border ${errors.payment_method ? 'border-red-500' : 'border-gray-300'} rounded-lg h-10 px-3 transition-colors duration-200 focus:outline-none focus:ring focus:ring-blue-500`}
          >
            <option value="">Select Payment Method</option>
            <option value="credit_card">Credit Card</option>
            <option value="cash">Cash</option>
            <option value="online">Online Payment</option>
          </select>
          {errors.payment_method && <p className="text-red-600 text-sm">{errors.payment_method.message}</p>}
        </div>

        <div>
          <label htmlFor="payment_status" className="block mb-1 font-semibold">Payment Status:</label>
          <select
            id="payment_status"
            {...register('payment_status', { required: 'Payment status is required' })}
            className={`mt-1 block w-full border ${errors.payment_status ? 'border-red-500' : 'border-gray-300'} rounded-lg h-10 px-3 transition-colors duration-200 focus:outline-none focus:ring focus:ring-blue-500`}
          >
            <option value="">Select Payment Status</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
            <option value="Failed">Failed</option>
            <option value="Refunded">Refunded</option>
          </select>
          {errors.payment_status && <p className="text-red-600 text-sm">{errors.payment_status.message}</p>}
        </div>

        <div>
          <label htmlFor="transaction_id" className="block mb-1 font-semibold">Transaction ID:</label>
          <input
            type="text"
            id="transaction_id"
            {...register('transaction_id')}
            className={`mt-1 block w-full border ${errors.transaction_id ? 'border-red-500' : 'border-gray-300'} rounded-lg h-10 px-3 transition-colors duration-200 focus:outline-none focus:ring focus:ring-blue-500`}
          />
        </div>

        <div>
          <label htmlFor="payment_reference_number" className="block mb-1 font-semibold">Reference Number:</label>
          <input
            type="text"
            id="payment_reference_number"
            {...register('payment_reference_number')}
            className={`mt-1 block w-full border ${errors.payment_reference_number ? 'border-red-500' : 'border-gray-300'} rounded-lg h-10 px-3 transition-colors duration-200 focus:outline-none focus:ring focus:ring-blue-500`}
          />
        </div>

        <div>
          <label htmlFor="change_given" className="block mb-1 font-semibold">Change Given:</label>
          <input
            type="number"
            id="change_given"
            step="0.01"
            {...register('change_given')}
            defaultValue="0.00"
            className={`mt-1 block w-full border ${errors.change_given ? 'border-red-500' : 'border-gray-300'} rounded-lg h-10 px-3 transition-colors duration-200 focus:outline-none focus:ring focus:ring-blue-500`}
          />
        </div>

        <div>
          <label htmlFor="discount_applied" className="block mb-1 font-semibold">Discount Applied:</label>
          <input
            type="number"
            id="discount_applied"
            step="0.01"
            {...register('discount_applied')}
            defaultValue="0.00"
            className={`mt-1 block w-full border ${errors.discount_applied ? 'border-red-500' : 'border-gray-300'} rounded-lg h-10 px-3 transition-colors duration-200 focus:outline-none focus:ring focus:ring-blue-500`}
          />
        </div>

        <div>
          <label htmlFor="tips" className="block mb-1 font-semibold">Tips:</label>
          <input
            type="number"
            id="tips"
            step="0.01"
            {...register('tips')}
            defaultValue="0.00"
            className={`mt-1 block w-full border ${errors.tips ? 'border-red-500' : 'border-gray-300'} rounded-lg h-10 px-3 transition-colors duration-200 focus:outline-none focus:ring focus:ring-blue-500`}
          />
        </div>

        <div>
          <label htmlFor="currency" className="block mb-1 font-semibold">Currency:</label>
          <input
            type="text"
            id="currency"
            defaultValue="USD"
            {...register('currency', { required: 'Currency is required' })}
            className={`mt-1 block w-full border ${errors.currency ? 'border-red-500' : 'border-gray-300'} rounded-lg h-10 px-3 transition-colors duration-200 focus:outline-none focus:ring focus:ring-blue-500`}
          />
          {errors.currency && <p className="text-red-600 text-sm">{errors.currency.message}</p>}
        </div>

        <div>
          <label htmlFor="payment_notes" className="block mb-1 font-semibold">Payment Notes:</label>
          <textarea
            id="payment_notes"
            {...register('payment_notes')}
            className={`mt-1 block w-full border ${errors.payment_notes ? 'border-red-500' : 'border-gray-300'} rounded-lg h-24 px-3 transition-colors duration-200 focus:outline-none focus:ring focus:ring-blue-500`}
          />
        </div>

        <button type="submit" className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200">
          Submit Payment
        </button>
      </form>
    </div>
  );
}

export default PaymentForm;





// import { useState, useEffect } from 'react';
// import { useForm } from 'react-hook-form';
// import axios from 'axios';

// function PaymentForm() {
//   const [orders, setOrders] = useState([]); // To store fetched orders
//   const [error, setError] = useState('');
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   // Fetch orders from the backend
//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const response = await axios.get('http://localhost:8000/orders');
//         setOrders(response.data); // Assuming response data is an array of orders
//       } catch (error) {
//         console.error('Error fetching orders:', error);
//         setError('Failed to fetch orders.');
//       }
//     };

//     fetchOrders();
//   }, []);

//   const onSubmit = async (data) => {
//     setError('');

//     try {
//       const response = await axios.post('http://localhost:8000/payment', data);
//       console.log('Payment submitted successfully:', response.data);
//     } catch (err) {
//       if (err.response) {
//         setError(err.response.data.message || 'An error occurred while processing the payment.');
//       } else {
//         setError('Error: ' + err.message);
//       }
//     }
//   };

//   return (
//     <div className="payment-form-container max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
//       <h2 className="text-center text-2xl font-bold mb-6">Payment Form</h2>
//       {error && <p className="text-red-600 text-center">{error}</p>}
//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//         {/* Order ID Dropdown */}
//         <div>
//           <label htmlFor="order_id" className="block mb-1 font-semibold">Order ID:</label>
//           <select
//             id="order_id"
//             {...register('order_id', { required: 'Order ID is required' })}
//             className={`mt-1 block w-full border ${errors.order_id ? 'border-red-500' : 'border-gray-300'} rounded-lg h-10 px-3 transition-colors duration-200 focus:outline-none focus:ring focus:ring-blue-500`}
//           >
//             <option value="">Select an Order</option>
//             {orders.map(order => (
//               <option key={order.id} value={order.id}>
//                 Order {order.id} - Table {order.table_number}
//               </option>
//             ))}
//           </select>
//           {errors.order_id && <p className="text-red-600 text-sm">{errors.order_id.message}</p>}
//         </div>

//         {/* Other form fields (payment date, amount, etc.) */}
//         <div>
//           <label htmlFor="payment_date" className="block mb-1 font-semibold">Payment Date:</label>
//           <input
//             type="datetime-local"
//             id="payment_date"
//             {...register('payment_date', { required: 'Payment date is required' })}
//             className={`mt-1 block w-full border ${errors.payment_date ? 'border-red-500' : 'border-gray-300'} rounded-lg h-10 px-3 transition-colors duration-200 focus:outline-none focus:ring focus:ring-blue-500`}
//           />
//           {errors.payment_date && <p className="text-red-600 text-sm">{errors.payment_date.message}</p>}
//         </div>

//         <div>
//           <label htmlFor="payment_amount" className="block mb-1 font-semibold">Amount:</label>
//           <input
//             type="number"
//             id="payment_amount"
//             step="0.01"
//             {...register('payment_amount', { required: 'Amount is required' })}
//             className={`mt-1 block w-full border ${errors.payment_amount ? 'border-red-500' : 'border-gray-300'} rounded-lg h-10 px-3 transition-colors duration-200 focus:outline-none focus:ring focus:ring-blue-500`}
//           />
//           {errors.payment_amount && <p className="text-red-600 text-sm">{errors.payment_amount.message}</p>}
//         </div>

//         {/* Other fields like payment method, status, transaction ID, etc. */}
//         <div>
//           <label htmlFor="payment_method" className="block mb-1 font-semibold">Payment Method:</label>
//           <select
//             id="payment_method"
//             {...register('payment_method', { required: 'Payment method is required' })}
//             className={`mt-1 block w-full border ${errors.payment_method ? 'border-red-500' : 'border-gray-300'} rounded-lg h-10 px-3 transition-colors duration-200 focus:outline-none focus:ring focus:ring-blue-500`}
//           >
//             <option value="">Select Payment Method</option>
//             <option value="credit_card">Credit Card</option>
//             <option value="cash">Cash</option>
//             <option value="online">Online Payment</option>
//           </select>
//           {errors.payment_method && <p className="text-red-600 text-sm">{errors.payment_method.message}</p>}
//         </div>

//         {/* ... additional fields for transaction_id, reference number, etc. */}
        
//         <button type="submit" className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200">
//           Submit Payment
//         </button>
//       </form>
//     </div>
//   );
// }

// export default PaymentForm;
