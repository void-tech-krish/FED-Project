import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import FilterBar from "./component/FilterBar";
import LogItem from "./component/LogItem";
import LogList from "./component/LogList";
import Summary from "./component/Summary";
import Alerts from "./component/Alerts";
import Errors from "./component/Errors";
import Login from "./component/Login";
import UserManagement from "./component/UserManagement";
import AdminPanel from "./component/AdminPanel";
import ClientForm from "./component/ClientForm";
import AnimatedCounter from "./component/AnimatedCounter";
import AuditLogs from "./component/AuditLogs";


export {
  AuditLogs,
  AnimatedCounter,
  ClientForm,
  AdminPanel,
  UserManagement,
  Login,
  FilterBar,
  LogItem,
  LogList,
  Summary,
  Alerts,
  Errors,
};


ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);