import { Navigate } from "react-router-dom";

import { useAppContext } from "../context/AppContext";

interface PublicRouteProps {
  children: React.ReactNode;
}

export function PublicRoute({ children }: PublicRouteProps) {
  const { auth } = useAppContext();

  if (auth && auth.loggedIn) {
    return <Navigate to="/" replace />;
  }

  return children;
}
