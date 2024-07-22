import { createBrowserRouter } from "react-router-dom";
import Epic1min from "./Epic1min";
import LifeCalendar from "./LifeCalendar";
import Spend2Buy from "./Spend2Buy";
import { center } from "./styles";

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
    path: "/life-calendar",
    element: <LifeCalendar />,
  },
  {
    path: "*",
    element: (
      <div css={[center]} style={{ width: "100vw", height: "100vh" }}>
        <p>Not Found</p>
      </div>
    ),
  },
]);

export default router;
