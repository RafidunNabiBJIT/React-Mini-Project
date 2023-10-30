import { Navigate, Outlet } from "react-router-dom";

const Authenticate = () => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const userId = localStorage.getItem("userId");
  console.log("token is ", token);

  return <div>{token ? <Outlet /> : <Navigate to="/login" />}</div>;
};

export default Authenticate;
