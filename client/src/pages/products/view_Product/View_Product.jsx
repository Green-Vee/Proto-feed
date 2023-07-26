import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductEditForm = ({ productId }) => {
  const [productData, setProductData] = useState({
    name: '',
    price: '',
    isSold: false,
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // Fetch the product data for the given productId from the server
        const response = await axios.get(`/api/products/${productId}`);
        setProductData(response.data);
      } catch (error) {
        console.error('Failed to fetch product:', error.response.data.error);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProductData({
      ...productData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleToggleIsSold = () => {
    setProductData({
      ...productData,
      isSold: !productData.isSold,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send a PUT request to update the product with the edited data
      await axios.put(`/api/products/${productId}`, productData);
      console.log('Product updated successfully!');
    } catch (error) {
      console.error('Failed to update product:', error.response.data.error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="isSold">Is Sold:</label>
        <input
          type="checkbox"
          id="isSold"
          name="isSold"
          checked={productData.isSold}
          onChange={handleChange}
        />
      </div>
      <div>
        {productData.isSold === false && (
          <>
            <label htmlFor="name">Product Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={productData.name}
              onChange={handleChange}
              required
            />
          </>
        )}
      </div>
      <div>
        {productData.isSold === false && (
          <>
            <label htmlFor="price">Price:</label>
            <input
              type="number"
              id="price"
              name="price"
              value={productData.price}
              onChange={handleChange}
              required
            />
          </>
        )}
      </div>
      <div>
        {/* Add a button to toggle 'isSold' value */}
        <button type="button" onClick={handleToggleIsSold}>
          {productData.isSold ? 'Mark as Not Sold' : 'Mark as Sold'}
        </button>
      </div>
      <button type="submit">Update Product</button>
    </form>
  );
};

export default ProductEditForm;
