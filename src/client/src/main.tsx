import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import Root from "./routes/root";
import {
  createBrowserRouter,
  RouterProvider,
  useNavigate,
} from "react-router-dom";
import ErrorPage from "./routes/error";
import Index from "./routes";
import "./tailwind.css";
import SignUp from "./routes/auth/signup";
import SignIn from "./routes/auth/signin";
import NewCalculator from "./routes/calculator/new";
import Results from "./routes/calculator/results";
import Data from "./routes/admin/data";
import Users from "./routes/admin/users";
import Statistics from "./routes/admin/statistics";
import { Token } from "./types/auth";
import { useAuth, UserContext } from "./contexts/useAuth";
import { RequireAdmin } from "./components/RequireAdmin";

const isDev = import.meta.env.DEV;

/**
 * Это реакт роутер,
 * Он содержит все маршруты на которые клиент может попасть и которые будут отображаться
 * @link https://reactrouter.com/en/6.11.2/start/tutorial
 */
const router = createBrowserRouter(
  [
    {
      element: <Root />,
      errorElement: <ErrorPage />,
      loader: async () => {
        return { companies: [1, 2, 3] };
      },
      children: [
        { index: true, element: <Index /> },
        {
          path: "auth",
          children: [
            { path: "signup", element: <SignUp /> },
            { path: "signin", element: <SignIn /> },
          ],
        },
        {
          path: "calculator",
          children: [
            { path: "new", element: <NewCalculator /> },
            { path: "results", element: <Results /> },
          ],
        },
        {
          path: "admin",
          children: [
            {
              path: "data",
              element: (
                <RequireAdmin>
                  <Data />
                </RequireAdmin>
              ),
            },
            {
              path: "users",
              element: (
                <RequireAdmin>
                  <Users />
                </RequireAdmin>
              ),
            },
            {
              path: "statistics",
              element: (
                <RequireAdmin>
                  <Statistics />
                </RequireAdmin>
              ),
            },
          ],
        },
      ],
    },
  ],
  // на нашем сервере путь начинается с /ldt-1 так что в зависимости от режима работы мы меняем базовый путь
  { basename: isDev ? "/" : "/ldt-1" }
);

/**
 * Главный компонент который создает провайдер пользовательского контекста для получения информации о пользователе
 *
 * @returns {any}
 */
function App() {
  const [user, setUser] = useState<Token | null>(null);
  return (
    <React.StrictMode>
      <UserContext.Provider value={{ user, setUser }}>
        <RouterProvider router={router} />
      </UserContext.Provider>
    </React.StrictMode>
  );
}
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
ReactDOM.createRoot(document.getElementById("root")!).render(<App />);

