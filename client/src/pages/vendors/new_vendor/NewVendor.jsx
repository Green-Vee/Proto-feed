// import "./new_customer.scss";
import { Link, useNavigate } from "react-router-dom";

import { useState } from "react";
// import { InputText } from "primereact/inputtext";

export default function NewProduct() {
  const [value, setValue] = useState("");

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("Please Fill all forms");

  const navigate = useNavigate();

  const handleInputs = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // const { login, currentUser } = useContext(AuthContext);

  // useEffect(() => {
  //   if (currentUser) {
  //     navigate("/");
  //   }
  // },[currentUser,navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(inputs);

    try {
      // await register(inputs);

      navigate("/");
    } catch (error) {
      setError(error.response.data);
    }
  };

  return (
    <>
      <div className="customer_container">
        <h2>Please fill all field to add a Vendor</h2>

        <form onSubmit={handleSubmit}>
          <div className="customer_inputs">
            <div className="input_form_1">
              <label>Full Name</label>
              <input
                type="text"
                required
                placeholder="Full Name"
                onChange={handleInputs}
                name="text"
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
                placeholder="Customer Number"
                onChange={handleInputs}
                name="number"
              />

              <label>Quantity</label>
              <input
                type="Number"
                required
                placeholder="Quantity"
                onChange={handleInputs}
                name="text"
              />

              <label htmlFor="">Item Name</label>
              <input
                type="text"
                required
                placeholder="Name of item"
                onChange={handleInputs}
                name="text"
              />

              <label htmlFor="">Price</label>
              <input
                type="Number"
                required
                placeholder="item Number"
                onChange={handleInputs}
                name="text"
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
