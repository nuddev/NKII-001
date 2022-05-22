import { RouterItem } from "@/models/Router";
import Home from "@/page/Home";
import React from "react";
import { Link, Route, Routes } from "react-router-dom";

const routes: Array<RouterItem> = [
  {
    path: "/",
    component: <Home />,
  },
  {
    path: "/step",
    children: [
      {
        index: true,
        component: <Link to={"/step/step2"}>step2</Link>,
      },
      {
        path: "step2",
        component: <Link to={"/step/step3"}>step3</Link>,
      },
      {
        path: "step3",
        component: <Link to={"/step"}>step1</Link>,
      },
    ],
  },
];

const createRoute = (e: RouterItem) => {
  return (
    <Route
      key={e.path}
      path={e.path}
      {...(e.component ? { element: e.component } : {})}
      {...(e.index ? { index: !!e.index } : {})}
    >
      {e.children && e.children?.map((e) => createRoute(e))}
    </Route>
  );
};
const RenderRoute = () => <Routes>{routes.map((e) => createRoute(e))}</Routes>;
export default RenderRoute;
