import { useState, useEffect } from 'react';
import axios from 'axios';

const TAX_RATE = 0.1; // Example tax rate of 10%

const OrderForm = () => {
    const [menus, setMenus] = useState([]);
    const [orderItems, setOrderItems] = useState([]);
    const [subtotal, setSubtotal] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [total, setTotal] = useState(0);
    const [tables, setTables] = useState([]);
    const [selectedTable, setSelectedTable] = useState('');

    // Fetch menu items from the backend
    useEffect(() => {
        const fetchMenus = async () => {
            try {
                const response = await axios.get("http://localhost:8000/api/menu");
                setMenus(response.data);
            } catch (error) {
                console.error("Error fetching menus", error);
            }
        };

        fetchMenus();
    }, []);

    // Fetch available tables from the backend
    useEffect(() => {
        const fetchTables = async () => {
            try {
                const response = await axios.get("http://localhost:8000/api/tables");
                setTables(response.data);
            } catch (error) {
                console.error("Error fetching tables", error);
            }
        };

        fetchTables();
    }, []);

    // Recalculate subtotal and total whenever orderItems or discount changes
    useEffect(() => {
        const newSubtotal = orderItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
        const tax = newSubtotal * TAX_RATE;
        const newTotal = newSubtotal + tax - discount;

        setSubtotal(newSubtotal);
        setTotal(newTotal);
    }, [orderItems, discount]);

    // Add item to the order
    const addItemToOrder = (menu, quantity) => {
        const parsedQuantity = parseInt(quantity);

        const existingItem = orderItems.find(item => item.id === menu.id);

        if (existingItem) {
            existingItem.quantity = parsedQuantity;
            setOrderItems([...orderItems]); // Trigger re-render
        } else if (parsedQuantity > 0) {
            setOrderItems([...orderItems, { ...menu, quantity: parsedQuantity }]);
        }
    };

    // Handle form submission to place the order
    const handleSubmitOrder = async () => {
        if (orderItems.length === 0) {
            alert('Please add items to your order before submitting.');
            return;
        }
        if (!selectedTable) {
            alert('Please select a table before submitting.');
            return;
        }

        const orderData = {
            table_number: selectedTable,
            order_items: orderItems,
            payment_status: 'pending',
            order_status: 'pending',
        };

        console.log('Submitting Order Data:', orderData);


        try {
            const response = await axios.post('http://localhost:8000/api/orders', orderData);
            console.log('Order placed successfully', response.data);

            // Reset order items after successful submission
            setOrderItems([]);
            setSubtotal(0);
            setTotal(0);
            setDiscount(0);
            setSelectedTable('');
        } catch (error) {
            console.error('Error placing order', error);
            alert('There was an error placing your order. Please try again later.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="mx-auto w-full max-w-lg bg-white rounded-lg p-8 shadow-lg border border-gray-200">
                <h2 className="text-center text-3xl font-bold leading-tight text-gray-900">
                    Place an Order
                </h2>

                {/* Table Selection */}
                <div className="mt-4">
                    <label htmlFor="tableSelect" className="block text-lg font-semibold">Select Table:</label>
                    <select
                        id="tableSelect"
                        className="border border-gray-300 rounded-md mt-1 p-2 w-full"
                        value={selectedTable}
                        onChange={(e) => setSelectedTable(e.target.value)}
                    >
                        <option value="" disabled>Select a table</option>
                        {tables.map((table) => (
                            <option key={table.id} value={table.number}>
                                Table {table.number} - {table.status === 'available' ? 'Available' : 'Occupied'}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Menu List */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                    {menus.map((menu) => (
                        <div key={menu.id} className="bg-gray-50 rounded-lg shadow-md p-4 flex flex-col">
                            {menu.imageUrl && (
                                <img src={`http://localhost:8000${menu.imageUrl}`} alt={menu.name} className="w-full h-32 object-cover rounded-md" />
                            )}
                            <h3 className="text-xl font-semibold mt-2">{menu.name}</h3>
                            <p>{menu.description}</p>
                            <p className="font-bold">Price: ${menu.price}</p>
                            <label className="mt-2 block">
                                Quantity:
                                <input
                                    type="number"
                                    min="1"
                                    className="border border-gray-300 rounded-md mt-1 p-1 w-full"
                                    onChange={(e) => addItemToOrder(menu, e.target.value)}
                                />
                            </label>
                        </div>
                    ))}
                </div>

                {/* Summary */}
                <div className="mt-6">
                    <h3 className="text-xl font-semibold">Order Summary</h3>
                    <p>Subtotal: NRP{subtotal.toFixed(2)}</p>
                    <p>Tax (10%): NRP{(subtotal * TAX_RATE).toFixed(2)}</p>
                    <p>Discount: NRP{discount.toFixed(2)}</p>
                    <p className="font-bold">Total: NRP{total.toFixed(2)}</p>
                </div>

                {/* Submit Button */}
                <button
                    className="mt-6 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={handleSubmitOrder}
                >
                    Place Order
                </button>
            </div>
        </div>
    );
};

export default OrderForm;
