import "./print.scss";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { Link } from "react-router-dom";

const PrintComponent = ({ onClose }) => {
  const { data } = useContext(AuthContext);

  // console.log(data);
  return (
    <div className="printable-content">
      <h2>Invoice</h2>
     
      <p>Full Name: {data?.full_name}</p>
      <p>Email: {data?.email}</p>
      <p>Address: {data?.address}</p>
      <p>District: {data?.district}</p>
      <p>Phone: {data?.phone}</p>
      <p>Phone 2: {data?.phone_2}</p>

      <h2>Bought products</h2>
      <table>
        <thead>
          <tr>
            <th>Product Type</th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>KGs</th>
            {/* <th>Is Sold</th> */}
          </tr>
        </thead>
        <tbody>
          {data?.cartItems.map((item) => (
            <tr key={item._id}>
              <td>{item.productType}</td>
              <td>{item.name}</td>
              <td>{item.price}</td>
              <td>{item.quantity}</td>
              <td>{item.kgs}</td>
              {/* <td>{item.isSold ? "Yes" : "No"}</td> */}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="buttons">
        <button className="button" type="button" onClick={() => window.print()}>
          print
        </button>
        <Link to="/new/sale">
          <button type="button">Close</button>
        </Link>
      </div>
    </div>
  );
};

export default PrintComponent;
