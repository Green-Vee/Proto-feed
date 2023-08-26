import "./widget.scss";
import { Link } from "react-router-dom";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import { AuthContext } from "../../context/authContext";
import { useContext, useEffect, useState } from "react";
import axios from "axios";

const Widget = ({ type }) => {
  const [products, setProducts] = useState([]);

  const { sales } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get("/api/products")
      .then((response) => {
        const products = response.data;
        setProducts(products);
        // console.log(products);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, [setProducts]);

  const amounts = products?.map((trans) => trans.price);
  // const products = sales?.map((trans) => trans.full_name);
  // console.log(customers);

  const total = amounts?.reduce((acc, item) => (acc += item), 0).toFixed(2);

  const customers_list = sales?.length;
  const capital = 2000000000.0;
  const balance = products?.filter((product) => product.isSold === false);
  const diff = 20;

  return (
    <>
      <div className="widget">
        <div className="left">
          <Link to="/products" style={{ textDecoration: "none" }}>
            <span className="title">Total Sold Amount</span>
          </Link>

          <span className="counter">
            <b>${total || 0}</b>
          </span>
          <span className="link"> </span>
        </div>
        <div className="right">
          <div className="percentage positive">
            <KeyboardArrowUpIcon />
          </div>
        </div>
      </div>

      <div className="widget">
        <div className="left">
          <Link to="/products" style={{ textDecoration: "none" }}>
            <span className="title">Customers List</span>
          </Link>

          <span className="counter">
            <b>{customers_list || 0}</b>
          </span>
          <span className="link"> </span>
        </div>
        <div className="right">
          <div className="percentage positive">
            <KeyboardArrowUpIcon />
          </div>
        </div>
      </div>

      <div className="widget">
        <div className="left">
          <Link to="/products" style={{ textDecoration: "none" }}>
            <span className="title">Products Total</span>
          </Link>

          <span className="counter">
            <b>{products.length}</b>
          </span>
          <span className="link"> </span>
        </div>
        <div className="right">
          <div className="percentage positive">
            <KeyboardArrowUpIcon />
          </div>
        </div>
      </div>

      <div className="widget">
        <div className="left">
          <Link to="/products" style={{ textDecoration: "none" }}>
            <span className="title"> Remaining Products</span>
          </Link>

          <span className="counter">
            <b>{balance.length}</b>
          </span>
          <span className="link"> </span>
        </div>
        <div className="right">
          <div className="percentage positive">
            <KeyboardArrowUpIcon />
          </div>
        </div>
      </div>
    </>
  );
};

export default Widget;
