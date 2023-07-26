import "./sidebar.scss";
import Dashboard from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import "primereact/resources/themes/lara-dark-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";

const SideBar = () => {
  const { logout, currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const call_logout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="sidebar" >
      <Link to="/" style={{ textDecoration: "none" }}>
        <div className="top">
          <h1 className="logo">PROTO FEED</h1>
        </div>
        <hr />
      </Link>

      <div className="center">
        <ul>
          <p className="title">DASHBOARD </p>
          <Link to="/" style={{ textDecoration: "none" }}>
            <li>
              <Dashboard className="icon" />
              <span>Main </span>
            </li>
          </Link>

          <p className="title">CUSTOMERS </p>
          <Link to="/customers" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>View </span>
            </li>
          </Link>
          <Link to="/new/sale" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span> Add </span>
            </li>
          </Link>

          <p className="title">PRODUCTS </p>
          <Link to="/products" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>View </span>
            </li>
          </Link>
          <Link to="/new/product" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span> Add </span>
            </li>
          </Link>

          {/* <p className="title">VENDORS</p>
          <Link to="/vendors" style={{ textDecoration: "none" }}>
            <li>
              <InsertChartIcon className="icon" />
              <span>View </span>
            </li>
          </Link>

          <Link to="/new/vendor" style={{ textDecoration: "none" }}>
            <li>
              <InsertChartIcon className="icon" />
              <span>Add </span>
            </li>
          </Link> */}

          <p className="title">SALES</p>

          <Link to="/sales" style={{ textDecoration: "none" }}>
            <li>
              <PsychologyOutlinedIcon className="icon" />
              <span>View</span>
            </li>
          </Link>

          <Link to="/new/sale" style={{ textDecoration: "none" }}>
            <li>
              <PsychologyOutlinedIcon className="icon" />
              <span>Add</span>
            </li>
          </Link>

          <p className="title">USER</p>
          <li>
            <AccountCircleOutlinedIcon className="icon" />
            <span>{currentUser.username}</span>
          </li>
          <li onClick={call_logout}>
            <ExitToAppIcon className="icon" />
            <span>Logout</span>
          </li>
        </ul>
      </div>

      <hr />

      <div className="bottom">
        <div className="colorOption"></div>
        <div className="colorOption"></div>
      </div>
    </div>
  );
};

export default SideBar;
