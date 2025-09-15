import { Navigate } from "react-router-dom";

import Loading from "../components/Loading";
import { useAuthContext } from "../context/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { auth, loadingScreen } = useAuthContext();

  if (loadingScreen) {
    return <Loading type="auth" />;
  }

  if (auth && auth.loggedIn) {
    return children;
  } else {
    return <Navigate to="/welcome" replace />;
  }
}
