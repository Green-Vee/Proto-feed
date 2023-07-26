import "./navbar.scss";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import FullscreenExitOutlinedIcon from "@mui/icons-material/FullscreenExitOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import Img from "../../assets/noAvatar.png";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
// import { DarkModeContext } from "../../context/darkModeContext";

const Navbar = () => {

  const { currentUser } = useContext(AuthContext);

  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="search">
          <input type="text" placeholder="Search..." />
          <span>
            <SearchOutlinedIcon />
          </span>
        </div>

        <div className="items">
          <div className="item">
            {(<h3>Welcome { currentUser.username}</h3>)}
            <img src={Img} alt="" className="avatar" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
