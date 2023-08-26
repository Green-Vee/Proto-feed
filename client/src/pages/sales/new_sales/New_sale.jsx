import { useContext, useEffect, useState } from "react";
import "./new_sale.scss";
import { AuthContext } from "../../../context/authContext";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CartModal from "../../../components/CartModal";

const App = () => {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);

  useEffect(() => {
    axios
      .get("/api/products")
      .then((response) => {
        const products = response.data;
        //  const  sortedData = [...products].sort((a, b) =>  a.createdAt -b.createdAt);

        setProducts(products);
        // console.log(products);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, [setProducts]);

  const available_products = products?.filter(
    (product) => product.isSold === false
  );

  const handleBuyClick = (productId) => {
    const product = products.find((item) => item._id === productId);
    if (product) {
      // Toggle the isSold property
      product.isSold = !product.isSold;

      axios
        .put(`/api/products/${productId}/toggleIsSold`)
        .then((response) => {
          // If the update was successful, you can handle the response as needed
          setProducts(response.data);
        })
        .catch((error) => {
          // If an error occurred during the update, handle the error
          console.error("Error updating product:", error);
        });

      // Add the item to the cart
      setCartItems((prevCartItems) => [...prevCartItems, product]);
    }
  };

  const handleToggleIsSold = (itemId) => {
    // console.log(itemId)
    axios
      .put(`/api/products/${itemId}/toggleIsSold`)
      .then((response) => {
        // If the update was successful, you can handle the response as needed
        setProducts(response.data);
      })
      .catch((error) => {
        // If an error occurred during the update, handle the error
        console.error("Error updating product:", error);
      });
  };

  const ProductTable = () => {
    const itemsPerPage = 4;

    // State to keep track of the current page number
    const [currentPage, setCurrentPage] = useState(1);

    // Calculate the total number of pages
    const totalPages = Math.ceil(available_products.length<30 / itemsPerPage);

    // Function to handle page navigation
    const handlePageChange = (newPage) => {
      setCurrentPage(newPage);
    };

    // Slice the data array to display only the items for the current page
    const currentPageData = available_products.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );

    // handleBuyClick(product);

    return (
      <div className="productTable">
        <h2>Product Information</h2>
        <table>
          <thead>
            <tr>
              <th>Product Type</th>
              <th>Name</th>
              <th>Price</th>
              <th>Status</th>
              <th>Purchase</th>
            </tr>
          </thead>
          <tbody>
            {currentPageData.map((product) => (
              <tr key={product._id}>
                <td>{product.productType.toUpperCase()}</td>
                <td>{product.name.toUpperCase()}</td>
                <td>{product.price}</td>
                <td>{product.isSold ? "Sold" : "Available"}</td>
                <td>
                  <button
                    // //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    disabled={cartItems.length > 7}
                    type="button"
                    onClick={() => handleBuyClick(product._id)}
                  >
                    {product.isSold ? "Sold" : "Buy"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Pagination */}
        <div className="pagination">
          {/* Previous page button */}
          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Previous
          </button>

          {/* Page numbers */}
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              type="button"
              key={index}
              className={currentPage === index + 1 ? "active" : ""}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}

          {/* Next page button */}
          <button
            type="button"
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next
          </button>
        </div>
      </div>
    );
  };

  const { currentUser, add_sale, sales } = useContext(AuthContext);

  const { _id } = currentUser;

  const handleShowCart = () => {
    setIsCartModalOpen(true);
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setIsCartModalOpen(false);
  };

  const handleRemoveItem = (itemId) => {
    setCartItems((prevCartItems) =>
      prevCartItems.filter((item) => item._id !== itemId)
    );
  };

  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    user_id: _id,
    full_name: "",
    email: "",
    address: "",
    district: "",
    phone: "",
    phone_2: "",
  });

  const handleInputs = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // const vat = (fields * 16.5) / 100;
  // const total = fields + vat;

  const { full_name, email, address, district, phone, phone_2 } = inputs;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      user_id: _id,
      full_name,
      email,
      address,
      district,
      phone,
      phone_2,
      cartItems,
    };

    try {
      if (
        full_name === "" ||
        email === "" ||
        address === "" ||
        district === "" ||
        phone === "" ||
        phone_2 === ""
      )
        return toast.error("Please fill all fields");

      if (cartItems.length === 0)
        return toast.error("Please add a product in the cart to buy ");

      add_sale(data);
      // console.log(data)
      // console.log(printData);

      toast.success("Sold!!!!!!");
      // window.print();

      navigate("/print");
    } catch (error) {
      console.log(error);
      toast.error(error.response.statusText);
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <>
        <div className="new_sale_container">
          <ToastContainer />
          <form>
            <h1>Fill all Fields to Add a Sale</h1>

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
              </div>

              <div className="input_form_2">
                <label htmlFor="">District</label>
                <input
                  type="text"
                  required
                  placeholder="Customer's District"
                  onChange={handleInputs}
                  name="district"
                />

                <label>Phone</label>
                <input
                  type="number"
                  required
                  placeholder="Customer Number"
                  onChange={handleInputs}
                  name="phone"
                />

                <label>Phone 2</label>
                <input
                  type="number"
                  required
                  placeholder="Customer second number"
                  onChange={handleInputs}
                  name="phone_2"
                />
              </div>
            </div>

            <h2>
              After filling all customers's details click the right Button to
              add item fields
            </h2>
            {available_products.length !== 0 ? (
              <ProductTable />
            ) : (
              <>
                <div className="sorry">
                  <h1>SORRY! WE'RE OUT OF PRODUCTS</h1>
                </div>
              </>
            )}

            {isCartModalOpen && (
              <CartModal
                toggleBuy={handleToggleIsSold}
                cartItems={cartItems}
                onClose={handleCloseModal}
                onRemoveItem={handleRemoveItem}
              />
            )}

            <div className="button_container">
              <button type="submit" onClick={handleSubmit}>
                Submit
              </button>

              <button
                type="button"
                onClick={handleShowCart}
              >
                cart {cartItems.length}
              </button>
            </div>
          </form>
        </div>
      </>
    </>
  );
};

export default App;
