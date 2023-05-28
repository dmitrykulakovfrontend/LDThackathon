import { useLocation, Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/useAuth";

/**
 * Компонент-обертка которая требует админские права или перенаправляю на страницу авторизации
 * @returns {any}
 */
export function RequireAdmin({ children }: { children: JSX.Element }) {
  const { user } = useAuth();

  if (user === undefined) {
    return <span>"Загрузка..."</span>;
  }

  if (!user?.role.includes("ROLE_ADMIN")) {
    return <Navigate to="/auth/signin" />;
  } else {
    return children;
  }
}
