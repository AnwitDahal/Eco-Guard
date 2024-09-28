import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import SignUpIndie from "./Pages/SignUpIndie";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login/>}/>
      <Route path="/signupindie" element={<SignUpIndie/>}/>
    </Routes>
  );
};

export default App;
