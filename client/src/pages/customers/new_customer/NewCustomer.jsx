import "./new_customer.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../../../context/authContext";

export default function New_customer() {
  const { currentUser } = useContext(AuthContext);

  const { _id } = currentUser;


  const [inputs, setInputs] = useState({
    user_id: _id,
    full_name: "",
    email: "",
    address: "",
    district: "",
    phone: "",
    quantity: "",
    item_name: "",
    price: "",
  });
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleInputs = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(inputs);

    try {
      await axios.post("/api/customers/", inputs);
      toast.success("New customer added");

      navigate("/customers");
    } catch (error) {
      toast.error("Something went wrong");

      setError(error.response.data);
    }
  };

  return (
    <>
      <div className="customer_container">
        <h2>Please fill all field to add customer</h2>

        <form onSubmit={handleSubmit}>
          <div className="customer_inputs">
            <div className="input_form_1">
              <label>Full Name</label>
              <input
                type="text"
                required
                placeholder="Full Name"
                onChange={handleInputs}
                name="full_name"
              />
              <label>Email</label>

              <input
                type="email"
                required
                placeholder="Customer's Email"
                onChange={handleInputs}
                name="email"
              />

              <label>Address</label>

              <input
                type="text"
                required
                placeholder="Customer's Address"
                onChange={handleInputs}
                name="address"
              />

              <label htmlFor="">District</label>
              <input
                type="text"
                required
                placeholder="Customer's District"
                onChange={handleInputs}
                name="district"
              />
            </div>

            <div className="input_form_2">
              <label>Phone</label>
              <input
                type="number"
                required
                placeholder="Customer number"
                onChange={handleInputs}
                name="phone"
              />

              <label>Quantity</label>
              <input
                type="number"
                required
                placeholder="Quantity"
                onChange={handleInputs}
                name="quantity"
              />

              <label htmlFor="">Item Name</label>
              <input
                type="text"
                required
                placeholder="Name of item"
                onChange={handleInputs}
                name="item_name"
              />

              <label htmlFor="">Price</label>
              <input
                type="number"
                required
                placeholder="item price"
                onChange={handleInputs}
                name="price"
              />
            </div>
          </div>

          <button type="submit">Add</button>

          {error && <p>{error}</p>}
        </form>
      </div>
    </>
  );
}
