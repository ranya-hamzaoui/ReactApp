import PrivateRoute from "../components/privateRoutes";
import React, { Suspense } from 'react';
import SpinnerComponent from "../components/ui/SpinnerComponent";
// import Layout from "../components/layouts/Layout";
// import Login from "../pages/auth/Login";
// import { NotFound } from "../pages/NotFound";
// import { Unauthorized } from "../pages/Unauthorized";
// import Home from "../pages/Home";
// import Register from "../pages/auth/Register";
// import Posts from "../pages/Posts";
// import Users from "../pages/Users";

// Lazy loading des composants
const Login = React.lazy(() => import('../pages/auth/Login'));
const Layout = React.lazy(() => import('../components/layouts/Layout'));
const Home = React.lazy(() => import('../pages/Home'));
const Posts = React.lazy(() => import('../pages/Posts'));
const Users = React.lazy(() => import('../pages/Users'));
const UserDetail = React.lazy(() => import('../components/features/authTest/UserDetail'));
const Register = React.lazy(() => import('../pages/auth/Register'));
const Unauthorized = React.lazy(() => import('../pages/Unauthorized'));
const NotFound = React.lazy(() => import('../pages/NotFound'));

export const routes = () => {
  return [
    {
      path: "/",
      element: (
        <Suspense fallback={<SpinnerComponent/>}>
          <Login />
        </Suspense>
      ),
    },
    {
      path: "/",
      element: (
        <Suspense fallback={<SpinnerComponent/>}>
          <Layout />
        </Suspense>
      ),
      children: [
        {
          path: "/home",
          element: (
            <Suspense fallback={<SpinnerComponent/>}>
              <Home/>
            </Suspense>
          ),
        },
        {
          path: "/posts",
          element: (
            <Suspense fallback={<SpinnerComponent/>}>
              <PrivateRoute roles={['admin', 'user']}>
                <Posts />
              </PrivateRoute>
            </Suspense>
          ),
        },
        {
          path: "/users",
          element: (
            <Suspense fallback={<SpinnerComponent/>}>
              <Users />
            </Suspense>
          ),
        },
        {
          path: "/users/:id",
          element: (
            <Suspense fallback={<SpinnerComponent/>}>
              <UserDetail/>
            </Suspense>
          )
        }
      ],
    },
    {
      path: "/register",
      element: (
        <Suspense fallback={<SpinnerComponent/>}>
          <Register />
        </Suspense>
      ),
    },
    {
      path: "/no_access",
      element: (
        <Suspense fallback={<SpinnerComponent/>}>
          <Unauthorized />
        </Suspense>
      ),
    },
    {
      path: "*",
      element: (
        <Suspense fallback={<SpinnerComponent/>}>
          <NotFound />
        </Suspense>
      ),
    },
  ];
};

// export const routes = () => {
//         return [
//           {
//             path: "/",
//             element: <Login />,
//           },
//           {
//             path: "/",
//             element: <Layout />,
//             children: [
//               {
//                 path: "/home",
//                 element: <Home />,
//               },
//               {
//                 path: "/posts",
//                 element: (
//                 <PrivateRoute roles={['admin','user']}> 
//                 <Posts /> 
//                 </PrivateRoute>
//                 ),
//               },
//               {
//                 path: "/users",
//                 element: <Users />,
//               }
//             ],
//           },
//           {
//             path: "/register",
//             element: <Register />,
//           },
//           {
//             path: "/no_access",
//             element: <Unauthorized />,
//           },
//           {
//             path: "*",
//             element: <NotFound />,
//           },
//         ];
//       };