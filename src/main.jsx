import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home.jsx'
import { AdminHome, AuthLayout, Login, MenuCard, MenuForm,OrderForm,PaymentForm,OrdersCard, CustomerHome, ChefHome ,MenuCardView} from './components/index.js'


import Signup from './pages/Signup'
import MenuDetails from './components/MenuDetails.jsx'
import { CustomerHeader } from './components/index.js'
import OrderDetails from './components/OrdersDetails.jsx'
import OrdersList from './components/OrdersCard.jsx'
import MenuList from './components/MenuList.jsx'



const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
        {
            path: "/",
            element: <Home />,
        },
        {
            path: "/login",
            element: (
                <AuthLayout authentication={false}>
                    <Login />
                </AuthLayout>
            ),
        },
        {
            path: "/signup",
            element: (
                <AuthLayout authentication={false}>
                    <Signup />
                </AuthLayout>
            ),
        },

        {
            path: "/admin-home",
            element: (
                <AuthLayout authentication= {" false"}>
                    <AdminHome />
                </AuthLayout>
            ),
        },

        {
            path:"/customer-home",
            element:(
                <AuthLayout authentication={"false"}>
                    <CustomerHome/>
                </AuthLayout>
            ),
        },

        {
            path:"/chef-home",
            element:(
                <AuthLayout authentication={"false"}>
                    <ChefHome/>
                </AuthLayout>
            ),
        },

        {
            path: "/orders-details",
            element: (
                <AuthLayout authentication={"false"}>
                    <OrdersList />
                </AuthLayout>
            ),
        },

        {
            path: "/all-menus",
            element: (
                <AuthLayout authentication={"false"}>
                    <MenuCard />
                </AuthLayout>
            ),
        },
        {
            path: "/add-menus",
            element: (
                <AuthLayout authentication= {" false"}>
                    <MenuForm />
                </AuthLayout>
            ),
        },
        {
            path: "/add-order",
            element: (
                <AuthLayout authentication= {" false"}>
                    <OrderForm />
                </AuthLayout>
            ),
        },
      
        {
            path: "/payment",
            element: (
                <AuthLayout authentication= {" false"}>
                    <PaymentForm />
                </AuthLayout>
            ),
        },
        {
            path:"/menu-details/:id",
            element:(
                <AuthLayout authentication={"false"}>
                    <MenuDetails/>
                </AuthLayout>
            ),
        },

        {
            path:"/orders-list",
            element:(
                <AuthLayout authentication={"false"}>
                    <OrdersCard/>
                </AuthLayout>
            ),
        },

        {
            path:"/menu-details/:id",
            element:(
                <AuthLayout authentication={"false"}>
                    <MenuDetails/>
                </AuthLayout>
            ),
        },

     
        {
            path:"/customer-header",
            element:(
                <AuthLayout authentication={"false"}>
                    <CustomerHeader/>
                </AuthLayout>
            ),
        },

        {
            path:"/add-payment",
            element:(
                <AuthLayout authentication={"true"}>
                    <PaymentForm/>
                </AuthLayout>
            ),
        },

        {
            path:"/orders-card",
            element:(
                <AuthLayout authentication={"false"}>
                    <OrdersCard/>
                </AuthLayout>
            ),
        },
        {
            path:"/orders-details/:id",
            element:(
                <AuthLayout authentication={"false"}>
                    <OrderDetails/>
                </AuthLayout>
            ),
        },
        {
            path:"/menu-list",
            element:(
                <AuthLayout authentication={"false"}>
                    <MenuList/>
                </AuthLayout>
            ),
        },

        {
            path:"/menu-card-view",
            element:(
                <AuthLayout authentication={"false"}>
                    <MenuCardView/>
                </AuthLayout>
            ),
        },
      
    ],
},
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>,
)