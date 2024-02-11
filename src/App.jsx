import { RouterProvider, createBrowserRouter } from "react-router-dom";
import store from "./store/store";
import { Provider } from "react-redux";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Layout from "./layout/Layout";
import Dashboard from "./herosections/Dashboard";
import Schedule from "./herosections/Schedule";
import Instructor from "./herosections/Instructor";
import UploadCourse from "./herosections/UploadCourse";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/main",
      element: <Layout />,
      children: [
        {
          path: "dashboard",
          element: <Dashboard />,
        },
        {
          path: "course/new",
          element: <UploadCourse />,
        },
        {
          path: "schedule",
          element: <Schedule />,
        },
        {
          path: "instructors",
          element: <Instructor />,
        },
      ],
    },
  ]);

  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
