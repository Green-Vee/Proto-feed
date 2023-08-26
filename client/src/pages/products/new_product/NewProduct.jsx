import { useState } from "react";
import "./new_product.scss";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const ProductForm = () => {
  const productNames = ["broilers", "layers", "cattle"];
  const [form, setForm] = useState({
    name: "",
    prices: "",
    kgs: "",
  });

  const initialFormData = { productType: "" };

  const [formData, setFormData] = useState(initialFormData);
  const [validationErrors, setValidationErrors] = useState({});

  const handleProductChange = (e) => {
    const { value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, productType: value }));
  };

  const handleInputs = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const { productType } = formData;
  const { prices, name, kgs, quantity } = form;

  const vat = (prices * 16.5) / 100;
  const price = vat + Number(prices);
  // const data = { productType, name, price, kgs, quantity };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.productType) {
      setValidationErrors({ productType: "Please select a product." });
      return;
    }
    setValidationErrors({});

try {
  const newItems = [];

  for (let i = 0; i < quantity; i++) {


    // Create a new item based on the product name, price, and generated ID
    const newItem = {
      productType, name, price, kgs, quantity
      // ... other item properties ...
    };

    newItems.push(newItem);
    // console.log(newItems);
  }

  // Send the form data to the backend using axios
  axios
    .post("/api/products/", newItems)
    .then((response) => {
      // console.log("Response from server:", response.data);

      toast.success("Product added...");
    })
    .catch((error) => {
      console.error("Error sending data to server:", error);
      toast.error("Failed to add the product");
      // Optionally, display an error message or handle the error here
    });

  // Reset the form after successful submission (you can also handle this in the server's response)
  setFormData(initialFormData);
} catch (error) {
  console.log(error)
}
  };

  return (
    <div className="add_products">
      <ToastContainer />
      <h2>Add a Product</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="product">Select Product:</label>
          <select
            id="product"
            value={formData.productType}
            onChange={handleProductChange}
            required
          >
            <option value="">Select a product</option>
            {productNames.map((productName) => (
              <option key={productName} value={productName}>
                {productName.charAt(0).toUpperCase() + productName.slice(1)}
              </option>
            ))}
          </select>
          {validationErrors.productType && (
            <div className="error-message">{validationErrors.productType}</div>
          )}
        </div>
        {formData.productType && (
          <div>
            <h3>
              Product Type:
              {formData.productType.charAt(0).toUpperCase() +
                formData.productType.slice(1)}
            </h3>
            <label htmlFor="">Name</label>
            <input type="text" required name="name" onChange={handleInputs} />

            <label htmlFor="">Price</label>
            <input
              type="number"
              required
              name="prices"
              onChange={handleInputs}
            />
            <label htmlFor="">Quantity</label>
            <input
              type="number"
              required
              name="quantity"
              onChange={handleInputs}
            />
            <label htmlFor="kgs"> Units in KGs</label>
            <select id="kgs" name="kgs" onChange={handleInputs} required>
              <option value="">Select a KGs</option>
              <option>50</option>
              <option>10</option>
            </select>

            <button type="submit">Add</button>
          </div>
        )}

      </form>
        {/* <h3>{validationErrors}</h3> */}
    </div>
  );
};

export default ProductForm;
