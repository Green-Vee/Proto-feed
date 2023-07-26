import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/authContext";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { ToastContainer, toast } from "react-toastify";

const Register = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  });

  const { currentUser } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, [currentUser, navigate]);

  const handleInputs = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/api/users/register", inputs);
      // toast.success("Sign up successfully Now login");
      navigate("/login");

      // toast.error("Passwords do not match");
    } catch (error) {
      toast.error(error.response.data);
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <div className="auth">
        <h1>Register 1 </h1>
        <ToastContainer />

        <form onSubmit={handleSubmit}>
          <InputText
            required
            type="text"
            placeholder="Username"
            onChange={handleInputs}
            name="username"
          />

          <InputText
            required
            type="email"
            placeholder="Email"
            onChange={handleInputs}
            name="email"
          />

          <Password
            required
            toggleMask={true}
            min={6}
            type="password"
            placeholder="Password"
            onChange={handleInputs}
            name="password"
          />

          <button type="submit">Register</button>

          <span>
            Already have an account?{" "}
            <Link to="/login" className="link">
              Login
            </Link>
          </span>
        </form>
      </div>
    </>
  );
};

export default Register;
