import MainLayout from "@/components/layouts/MainLayout";
import { RouterItem } from "@/models/Router";
import Home from "@/page/Home";
import React from "react";
import { Link, Outlet, Route, Routes } from "react-router-dom";

const routes: Array<RouterItem> = [
  {
    path: "/",
    component: <Home />,
  },
  {
    path: "/dashboard",
    component: (
      <MainLayout>
        <Outlet />
      </MainLayout>
    ),
    children: [
      {
        index: true,
        component: <Link to={"/dashboard/step2"}>step2</Link>,
      },
      {
        path: "step2",
        component: <Link to={"/dashboard/step3"}>step3</Link>,
      },
      {
        path: "step3",
        component: <Link to={"/dashboard"}>step1</Link>,
      },
    ],
  },
];
const createRoute = (e: RouterItem) => {
  return (
    <Route
      key={e.path || Math.random().toString(36).substring(7)}
      path={e.path}
      {...(e.component ? { element: e.component } : {})}
      {...(e.index ? { index: !!e.index } : {})}
    >
      {e.children?.length && e.children?.map((e) => createRoute(e))}
    </Route>
  );
};
const RenderRoute = () => {
  return <Routes>{routes.map((e) => createRoute(e))}</Routes>;
};
export default RenderRoute;
