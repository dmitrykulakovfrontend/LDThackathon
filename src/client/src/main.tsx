import React from "react";
import ReactDOM from "react-dom/client";
import Root from "./routes/root";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./routes/error";
import Index from "./routes";
import "./tailwind.css";
import SignUp from "./routes/auth/signup";
import SignIn from "./routes/auth/signin";
import NewCalculator from "./routes/calculator/new";
import ExistingCalculator from "./routes/calculator/existing";

const isDev = import.meta.env.DEV;

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
            { path: "existing", element: <ExistingCalculator /> },
          ],
        },
      ],
    },
  ],
  { basename: isDev ? "/" : "/ldt-1" }
);

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

