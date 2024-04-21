import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Signup from './Signup';
import Login from './Login';
import Admin from './Admin/Admin';
import Layout from './Layout';
import Profile from './Profile/Profile';


let route = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Signup />,
        },
        {
          path: "/signup",
          element: <Signup />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/profile",
          element: <Profile />,
        },
        {
          path: "/admin",
          element: <Admin />,
        },
       
      ],
    },
  ]);
  
  const Router = () => {
    return (
      <div>
        <RouterProvider router={route}></RouterProvider>
      </div>
    );
  };
  

export default Router;