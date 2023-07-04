import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Home from "./components/Home";
import Header from "./components/Header";
import Network from "./components/Network";
import Underconstruction from "./components/Underconstruction";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />
    },
    {
      path: "/signup",
      element: <Signup />
    },
    {
      path: "/home",
      element: <><Header /><Home /></>
    },
    {
      path: "/network",
      element: <><Header /><Network /></>
    },
    {
      path: "/jobs",
      element: <><Header /><Underconstruction /></>
    },
    {
      path: "/messaging",
      element: <><Header /><Underconstruction /></>
    },
    {
      path: "/notification",
      element: <><Header /><Underconstruction /></>
    },
    {
      path: "/*",
      element: <Login />
    }
    
  ]);
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
