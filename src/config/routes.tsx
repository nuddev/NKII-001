import MainLayout from "@/components/layouts/MainLayout";
import { RouterItem } from "@/models/Router";
import Home from "@/page/Home";
import React from "react";
import { Link, Outlet, Route, Routes } from "react-router-dom";
import {
  MenuFoldOutlined,
  UploadOutlined,
  UserOutlined,
} from "@ant-design/icons";
export const routes: Array<RouterItem> = [
  {
    path: "/",
    component: <Home />,
    key: "home",
    hidden: true,
  },
  {
    path: "/dashboard",
    label: "Dashboard",
    key: "dashboard",
    icon: <MenuFoldOutlined />,
    component: (
      <MainLayout>
        <Outlet />
      </MainLayout>
    ),
    children: [
      {
        component: <Link to={"/dashboard/step2"}>step2</Link>,
        key: "/dashboard/dashboard-2",
        path:"dashboard-2",
        icon: <UploadOutlined />,
        label: "dashboard-2",
        to:"/dashboard/dashboard-2",
      },
      {
        component: <Link to={"/dashboard/step2"}>step2</Link>,
        label: "dashboard-3",
        key: "/dashboard/dashboard-3",
        path:"dashboard-3",
        to:"/dashboard/dashboard-3",
        icon: <UserOutlined />,
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
export const RenderRoute = () => {
  return <Routes>{routes.map((e) => createRoute(e))}</Routes>;
};
