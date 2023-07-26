import React from "react";
import "./cartModal.scss"; // Import CSS module for the modal
import { Link } from "react-router-dom";

const CartModal = ({ cartItems, onClose, onRemoveItem, toggleBuy }) => {
  const totalAmount = cartItems.reduce((total, item) => total + item.price, 0);

  // const totalAmount = (totalAmount * 16.5) / 100;

  return (
    <>
      <div className="modalOverlay">
        <div className="modalContent">
          <h3>My Products</h3>
          <ul>
            {cartItems.map((item) => (
              <div key={item._id} className="details">
                <li>
                  <div>
                    <span>
                      {item.productType}_
                      {item.name} _{item.kgs}KGs_{item.price}
                    </span>
                  </div>
                </li>
                <button
                  type="button"
                  onClick={() => {
                    onRemoveItem(item._id), toggleBuy(item._id);
                  }}
                  className="removeX"
                >
                  Remove
                </button>
              </div>
            ))}
          </ul>

          {totalAmount && (
            <p>Total Amount and Vat: ${totalAmount.toFixed(2)}</p>
          )}

          <button type="button" className="close" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </>
  );
};

export default CartModal;
