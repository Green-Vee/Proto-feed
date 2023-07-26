import "./login.scss";
import { Password } from "primereact/password";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import { AuthContext } from "../context/authContext";
import { ToastContainer, toast } from "react-toastify";

export default function Login() {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleInputs = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const { login, currentUser } = useContext(AuthContext);

  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, [currentUser, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (inputs.email === "" || inputs.password === "") {
      return toast.error("Please fill all fields ");
    }
    try {
      await login(inputs);
      toast.success("Sign in successfully");

      navigate("/");
    } catch (error) {
      toast.error(error.response.data);
    }
  };

  return (
    <>
      <div className="auth">
        <ToastContainer />
        <h1>Login</h1>

        <form>
          <InputText
            required
            type="email"
            placeholder="Email"
            onChange={handleInputs}
            name="email"
          />

          <Password
            required
            type="password"
            placeholder="Password"
            onChange={handleInputs}
            name="password"
          />

          <button onClick={handleSubmit}>Login</button>

          <span>
            Don't you have an account?{" "}
            <Link className="link" to="/register">
              Register
            </Link>
          </span>
        </form>
      </div>
    </>
  );
}
