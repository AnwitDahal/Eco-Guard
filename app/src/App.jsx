import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import SignUpIndie from "./Pages/SignUpIndie";
import UserDashboard from "./Pages/UserDashboard";
import AirMonitor from "./Pages/AirMonitor";
import Alert from "./Pages/Alert";
import Setting from "./Pages/Setting";
import AddressAQIData from "./Components/AddressAQIData";
import SignUpOrg from "./Pages/SignUpOrg";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signupindie" element={<SignUpIndie />} />
      
      {/* Nested routes under /user */}
      <Route path="/user" element={<UserDashboard />}>
        {/* Default route when user navigates to /user */}
        <Route index element={<AddressAQIData />} />
        <Route path="air-monitor" element={<AirMonitor />} />
        <Route path="alert" element={<Alert />} />
        <Route path="setting" element={<Setting />} />
      </Route>
      <Route path="/signuporg" element={<SignUpOrg/>}/>
    </Routes>
  );
};

export default App;
