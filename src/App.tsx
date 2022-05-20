import { Button } from "antd";
import * as React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.less";
import Home from "./page/Home";
import Login from "./page/Login";
const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div>
        <h1>Hello, React Router!</h1>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Login />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};
export default App;
