import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./RootLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Genero from "./pages/Genero";
import Product from "./pages/Product";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login /> // sem header
  },
  {
    element: <RootLayout />, // com header
    children: [
      {
        path: "/home",
        element: <Home />
      },
      {
        path: "/genero/:generoNome",
        element: <Genero />
},
      {
        path: "/produto/:livroId",
        element: <Product />
      }
    ]
  }
]);

export default router;