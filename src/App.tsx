import { Button } from "antd";
import * as React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.less";
import { RenderRoute } from "./config/routes";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <RenderRoute />
    </BrowserRouter>
  );
};
export default App;
