import { createBrowserRouter } from "react-router-dom";
import Epic1min from "./Epic1min";
import Spend2Buy from "./Spend2Buy";

const router = createBrowserRouter([
  {
    path: "/spend2buy",
    element: <Spend2Buy />,
  },
  {
    path: "/epic1min",
    element: <Epic1min />,
  },
  {
    path: "*",
    element: <p>Not Found</p>,
  },
]);

export default router;
