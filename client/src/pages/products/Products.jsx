import "./products.scss";
import React, { useState, useEffect } from "react";
import axios from "axios";

const ProductForm = ({}) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("/api/products")
      .then((response) => {
        const products = response.data;
        setProducts(products);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  // console.log(products);
  return (
    <>
      {products.length !== 0 ? (
        <div className="container">
          <h2>Products</h2>

          <div className="products">
            {products.map((product) => (
              <div
                className={product.isSold ? "sold" : "product"}
                key={product._id}
              >
                <div className="product-type">Type: {product.productType}</div>
                <div className="product-name">Name: {product.name}</div>
                <div className="product-price">Price: {product.price}</div>
                <div className="product-price">
                  Quantity: {product.quantity}
                </div>
                <div className="product-price">Kilograms: {product.kgs}</div>
                <div className="product-sold">
                  Status:{" "}
                  <span>{product.isSold === false ? "Available" : "Sold"}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <>
          <h2 style={{padding:"20%" ,fontSize:"65px"}}>No Products Available</h2>
          <h2>Please add!</h2>
          <br />
        </>
      )}
    </>
  );
};

export default ProductForm;
