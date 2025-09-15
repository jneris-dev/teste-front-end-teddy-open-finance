import { Navigate } from "react-router-dom";

import { useAppContext } from "../context/AppContext";
import Loading from "../components/Loading";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { auth, loadingScreen } = useAppContext();

  if (loadingScreen) {
    return <Loading />;
  }

  if (auth && auth.loggedIn) {
    return children;
  } else {
    return <Navigate to="/welcome" replace />;
  }
}
