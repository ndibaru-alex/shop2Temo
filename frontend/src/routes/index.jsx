import { createBrowserRouter } from "react-router-dom";
import App from '../App'
import Home from "../pages/Home";
import Login from '../pages/Login'
import ForgotPassword from "../pages/ForgotPassword";
import SignUP from "../pages/SignUP";
import AdminPanel from '../pages/adminPanel'
import AllUsers from "../pages/AllUsers";
import Products from "../pages/Products";
import CategoryProduct from "../pages/CategoryProduct";
import ProductDetails from "../components/ProductDetails";
import Cart from "../pages/Cart";
import SearchProduct from "../pages/SearchProduct";

const router = createBrowserRouter([
    {
        path : '/',
        element : <App/>,
        children:[
            {
                path :'',
                element : <Home/>
            },
            {
                path: 'login',
                element : <Login/>

            },
            {
                path: "/forgot-password",
                element : <ForgotPassword/>
            },
            {
                path: "/sign-up",
                element: <SignUP/>

            },
            {
                path : "product-category/:categoryName",
                element : <CategoryProduct/>
            },
            {
                path : 'product/:id',
                element : <ProductDetails/>
            },
            {
                path : '/cart',
                element : <Cart/>
            },
            {
                path : '/search',
                element : <SearchProduct/>
            },
            {
            path: '/admin-panel',
            element : <AdminPanel/>,
            children : [
                 {
                path : 'all-users',
                element : <AllUsers/>
            },
            {
                path : 'products',
                element : <Products/>
            }
        

            ]
            }

           
           
           
        ]
    }
])

export default router;