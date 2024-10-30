// Features.jsx
import 'react';

const featuresData = [
  {
    title: 'Menu Management',
    description: 'Easily add, edit, and delete menu items with descriptions, prices, and images.',
    icon: '🍽️', // Example icon
  },
  {
    title: 'Order Tracking',
    description: 'Track orders in real-time and manage the status of each order efficiently.',
    icon: '📦',
  },
  {
    title: 'Customer Management',
    description: 'Manage customer information, preferences, and order history to improve service.',
    icon: '👥',
  },
  {
    title: 'Analytics and Reporting',
    description: 'Get insights on sales, customer preferences, and menu performance with detailed reports.',
    icon: '📊',
  },
  {
    title: 'Payment Processing',
    description: 'Integrate various payment methods for seamless transactions and invoicing.',
    icon: '💳',
  },
  {
    title: 'Reservation System',
    description: 'Allow customers to make reservations and manage seating arrangements easily.',
    icon: '🗓️',
  },
];

const Features = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Features of Our Restaurant Management System</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {featuresData.map((feature, index) => (
          <div key={index} className="bg-green-100 p-4 rounded-lg shadow-sm transition-transform transform hover:scale-105">
            <div className="text-4xl text-center mb-2">{feature.icon}</div>
            <h3 className="text-lg font-semibold text-center">{feature.title}</h3>
            <p className="text-gray-600 text-center">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
