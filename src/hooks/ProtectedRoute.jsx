import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ role, children }) => {
  const { user } = useSelector((state) => state.user);

  return <>{user?.role === role ? children : <Navigate to="/" />}</>;
};

export default ProtectedRoute;
