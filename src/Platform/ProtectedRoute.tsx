import { Navigate } from "react-router-dom";
import { useAuthenticationStore } from "../Store/AuthenticationStore";
import { ROUTES } from "./Routes";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { authenticatedUser } = useAuthenticationStore();

  if (authenticatedUser === null) return <Navigate to={ROUTES.login} replace />;

  return children;
}