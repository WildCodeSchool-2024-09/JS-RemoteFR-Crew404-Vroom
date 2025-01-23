import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { DataProvider } from "./contexts/DataContext";

/**
 * Pages
 */
import App from "./App";
import About from "./pages/About/About";
import Account from "./pages/Account/Account";
import BackofficeMain from "./pages/Admin/Admin";
import Contact from "./pages/Contact/Contact";
import Dashboard from "./pages/Dashboard/DashBoard";
import Home from "./pages/Home/Home";
import Maps from "./pages/Map/Map";
import NotFound from "./pages/NotFound/NotFound";
import Connexion from "./pages/connexion/Connexion";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/account",
        element: <Account />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/backoffice",
        element: <BackofficeMain />,
      },
      {
        path: "/maps",
        element: <Maps />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
      {
        path: "/connexion",
        element: <Connexion />,
      },
    ],
  },
]);

const rootElement = document.getElementById("root");

if (rootElement == null) {
  throw new Error(`Your HTML Document should contain a <div id="root"></div>`);
}

// Render the app inside the root element
createRoot(rootElement).render(
  <DataProvider>
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
    ,
  </DataProvider>,
);

/**
 * Helpful Notes:
 *
 * 1. Adding More Routes:
 *    To add more pages to your app, first create a new component (e.g., About.tsx).
 *    Then, import that component above like this:
 *
 *    import About from "./pages/About";
 *
 *    Add a new route to the router:
 *
 *      {
 *        path: "/about",
 *        element: <About />,  // Renders the About component
 *      }
 *
 * 2. Try Nested Routes:
 *    For more complex applications, you can nest routes. This lets you have sub-pages within a main page.
 *    Documentation: https://reactrouter.com/en/main/start/tutorial#nested-routes
 *
 * 3. Experiment with Dynamic Routes:
 *    You can create routes that take parameters (e.g., /users/:id).
 *    Documentation: https://reactrouter.com/en/main/start/tutorial#url-params-in-loaders
 */
