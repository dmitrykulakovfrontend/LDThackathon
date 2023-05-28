import { useLocation, Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/useAuth";

export function RequireAdmin({ children }: { children: JSX.Element }) {
  const { user } = useAuth();

  if (user === undefined) {
    return "Загрузка...";
  }

  if (!user?.role.includes("ROLE_ADMIN")) {
    return <Navigate to="/auth/signin" />;
  } else {
    return children;
  }
}
