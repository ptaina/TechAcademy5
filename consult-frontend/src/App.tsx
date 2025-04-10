import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register"; 
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/", 
    element: <Login />, 
  },
  {
    path: "/register", 
    element: <Register />, 
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;