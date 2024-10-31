import React, { useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import SignUpIndie from "./Pages/SignUpIndie";
import UserDashboard from "./Pages/UserDashboard";
import AirMonitor from "./Pages/AirMonitor";
import Alert from "./Pages/Alert";
import Setting from "./Pages/Setting";
import AddressAQIData from "./Components/AddressAQIData";
import SignUpOrg from "./Pages/SignUpOrg";
import Choosing from "./Pages/Choosing";
import { useAuthStore } from "./store/AppStore";

const ProtectedRoutes = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!user.isVerified) {
    return <Navigate to="/user" replace />;
  }

  return children;
};

// Redirecting authenticated users to the home page

const App = () => {
  const { checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/choosing" element={<Choosing />} />

      {/* Nested routes under /user */}
      <Route
        path="/user"
        element={
          <ProtectedRoutes>
            <UserDashboard />
          </ProtectedRoutes>
        }
      >
        <Route path='/user'
          element={
            <ProtectedRoutes>
              <AddressAQIData />
            </ProtectedRoutes>
          }
        />
        <Route
          path="air-monitor"
          element={
            <ProtectedRoutes>
              <AirMonitor />
            </ProtectedRoutes>
          }
        />
        <Route
          path="alert"
          element={
            <ProtectedRoutes>
              <Alert />
            </ProtectedRoutes>
          }
        />
        <Route
          path="setting"
          element={
            <ProtectedRoutes>
              <Setting />
            </ProtectedRoutes>
          }
        />
      </Route>

      <Route path="/signuporg" element={<SignUpOrg />} />
      <Route path="/signupindie" element={<SignUpIndie />} />
    </Routes>
  );
};

export default App;
