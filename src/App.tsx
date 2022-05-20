import * as React from "react";
import { hot } from "react-hot-loader";
import "./App.less";
const App: React.FC = () => {
  return <h1 className="ad">Webpack React Setup.</h1>;
};
export default hot(module)(App);
