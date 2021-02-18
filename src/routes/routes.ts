import About from "../pages/About";
import Characters from "../pages/Characters";
import Home from "../pages/Home";
import { TRoutes } from "../types";

const routes: TRoutes[] = [
  {
    path: "/",
    exact: true,
    component: Home,
  },
  { path: "/about", exact: true, component: About },
  { path: "/characters", exact: true, component: Characters },
];

export default routes;
