import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hook/useAuth";

function RequireAuth({ children }) {
  const location = useLocation();

  const { auth } = useAuth();

  if (!auth) return <Navigate to="/auth" state={{ from: location }} />;

  return children;
}

export default RequireAuth;
