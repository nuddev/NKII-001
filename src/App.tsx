import { Button } from "antd";
import * as React from "react";
import { hot } from "react-hot-loader";
import "./App.less";
const App: React.FC = () => {
  return <Button type="link">Link Button</Button>;
};
export default hot(module)(App);
