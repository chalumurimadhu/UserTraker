import React from "react";
import ReactDOM from "react-dom/client";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Admin from "./components/Admin/Admin";
import Router from "./components/Router";
import { Outlet } from "react-router-dom";


ReactDOM.createRoot(document.getElementById("root")).render(
   <div>
    <Router/>
    <Outlet/>
   </div>
)