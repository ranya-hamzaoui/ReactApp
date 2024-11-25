import Layout from "../components/layouts/Layout";
import Login from "../pages/auth/Login";
import { NotFound } from "../pages/NotFound";
import { Unauthorized } from "../pages/Unauthorized";
import Home from "../pages/Home";
import Register from "../pages/auth/Register";
import Posts from "../pages/Posts";
import Users from "../pages/Users";
import PrivateRoute from "../components/privateRoutes";

export const routes = () => {
        return [
          {
            path: "/",
            element: <Login />,
          },
          {
            path: "/",
            element: <Layout />,
            children: [
              {
                path: "/home",
                element: <Home />,
              },
              {
                path: "/posts",
                element: (<PrivateRoute roles={['admin','user']}> <Posts /> </PrivateRoute>),
              },
              {
                path: "/users",
                element: <Users />,
              }
            ],
          },
          {
            path: "/register",
            element: <Register />,
          },
          {
            path: "/no_access",
            element: <Unauthorized />,
          },
          {
            path: "*",
            element: <NotFound />,
          },
        ];
      };