import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/useAuth";
import { Outlet } from "react-router-dom";
/**
 * Компонент-обертка которая требует админские права или перенаправляю на страницу авторизации
 * @returns {any}
 */
export function RequireAdmin() {
  const { user } = useAuth();

  if (user === undefined) {
    return <span>"Загрузка..."</span>;
  }

  if (!user?.role.includes("ROLE_ADMIN")) {
    return <Navigate to="/auth/signin" />;
  } else {
    return <Outlet />;
  }
}
