import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { useContext } from "react";

const ProfileScreen = () => {
  const { currentUser } = useContext(AuthContext);

  return currentUser ? <Outlet /> : <Navigate to="login" replace />;
};

export default ProfileScreen;
