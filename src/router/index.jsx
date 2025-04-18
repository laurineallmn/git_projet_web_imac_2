import { createBrowserRouter } from "react-router-dom";
import App from "../components/App.jsx";
import Contact from "../components/contact.jsx";
import AboutUs from "../components/aboutUs.jsx";

export default createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
  {
    path: "/aboutus",
    element: <AboutUs />,
  },
]);