import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [sales, setSales] = useState(
    JSON.parse(localStorage.getItem("sales")) || null
  );
  const [data, setData] = useState(
    JSON.parse(localStorage.getItem("data")) || null
  );

  // LOGIN
  const login = async (inputs) => {
    const res = await axios.post("/api/users/login", inputs);

    setCurrentUser(res.data);
  };
  // DELETE SALE
  const delete_sale = async (id) => {
    // console.log(id)
    const res = await axios.delete(`/api/sales/${id}`);


    setSales(res.data);
  };

  const add_sale = async (data) => {
    const res = await axios.post("/api/sales", data);
    setData(data)
    // console.log(res.data)
    localStorage.setItem("sales", JSON.stringify(res.data));
    setSales(res.data);
    // console.log(res.data.length);
  };

  useEffect(() => {
    const get_sales = async () => {
      const res = await axios.get("/api/sales");
      setSales("");
      setSales(res.data);
    };

    get_sales();
  }, [setSales]);

  // LOGOUT
  const logout = async () => {
    // const res = await axios.post("/api/users/logout");

    setCurrentUser(null);
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider
      value={{ currentUser, login, logout, sales, add_sale, delete_sale,data }}
    >
      {children}
    </AuthContext.Provider>
  );
};
