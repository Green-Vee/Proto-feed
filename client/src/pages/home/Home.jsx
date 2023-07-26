import "./home.scss";
import SideBar from "../../components/side_bar/SideBar";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/nav_bar/Navbar";
import { Outlet } from "react-router-dom";
import "primereact/resources/themes/lara-dark-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import { ToastContainer } from "react-toastify";

const Home = () => {
  return (
    <>
      <div className="container">
        <div className="home">
          <SideBar />
          <div className="homeContainer">
            <Navbar />
            <ToastContainer />
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
