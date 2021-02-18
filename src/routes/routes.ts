import App from "../App";
import About from "../pages/About";
import Characters from "../pages/Characters";
import Home from "../pages/Home";

const routes = [
  { path: "/", exact: true, component: Home },
  { path: "/about", exact: true, component: About },
  { path: "/characters", exact: true, component: Characters },
];

export default routes;
