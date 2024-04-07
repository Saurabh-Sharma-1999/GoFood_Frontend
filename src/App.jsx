import Home from "./screens/Home";


import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from "./screens/Login";
import Signup from "./screens/Signup.jsx";

import "../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import { CartProvider } from "./components/ContextReducer.jsx";

import MyOrder from "./screens/MyOrder.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <div><Home /></div>
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/users",
    element: <Signup />
  },
  {
    path: "/myOrder",
    element: <MyOrder />
  }
  
  
])

function App() {


  return (
    <>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>

    </>
  )
}

export default App
