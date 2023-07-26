import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Outlet,
  createRoutesFromElements,
} from "react-router-dom";
import Home from "./pages/home/Home";
import "./App.css";

import Products from "./pages/products/Products";
import NewProduct from "./pages/products/new_product/NewProduct";
import View_Product from "./pages/products/view_Product/View_Product";
import PrivateRoute from "./components/PrivateRoute";
import Sales from "./pages/sales/Sales";
import New_sale from "./pages/sales/new_sales/New_sale";
import View_Sale from "./pages/sales/view_sale/View_sale";
import Login from "./pages/Login";
import Register from "./pages/Register";
import View_Customer from "./pages/customers/view_customer/View_Customer";
import NewCustomer from "./pages/customers/new_customer/NewCustomer";
import Customers from "./pages/customers/Customers";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./pages/dashboard/Dashboard";
import Vendor from "./pages/vendors/Vendors";
import NewVendor from "./pages/vendors/new_vendor/NewVendor";
import View_Vendor from "./pages/vendors/view_Vendor/View_Vendor";
import { ToastContainer } from "react-toastify";
import PrintComponent from "./components/PrintComponent";

// const Layout = () => {
//   return (
//     <>
//       <Home />
//       <Outlet />
//       <Footer />
//     </>
//   );
// };

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="" element={<PrivateRoute />}>
        <Route path="/" element={<Home />}>
          <Route path="/" element={<Dashboard />} />

          <Route path="/products" element={<Products />} />
          <Route path="/new/product" element={<NewProduct />} />
          <Route path="/product/:id" element={<View_Product />} />

          <Route path="/customers" element={<Customers />} />
          <Route path="/new/customer" element={<NewCustomer />} />
          <Route path="/customer/:id" element={<View_Customer />} />

          <Route path="/sales" element={<Sales />} />
          <Route path="/sale/:id" element={<View_Sale />} />
          <Route path="/new/sale" element={<New_sale />} />

          <Route path="/vendors" element={<Vendor />} />
          <Route path="/vendor/:id" element={<View_Vendor />} />
          <Route path="/new/vendor" element={<NewVendor />} />
        </Route>
      </Route>

      <Route path="/register" element={<Register />} />
      <Route path="/print" element={<PrintComponent />} />
      <Route path="/login" element={<Login />} />
    </Route>
  )
);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
