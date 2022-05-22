import { MainLayoutConfig } from "@/config/main-layout-config";
import { routes } from "@/config/routes";
import { RouterItem } from "@/models/Router";
import { Layout, Menu } from "antd";
import _ from "lodash";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { matchPath, NavigateFunction, useLocation, useMatch, useNavigate } from "react-router-dom";
import "./index.less";
const { Header, Sider, Content } = Layout;
type Props = {
  children: React.ReactNode;
};
const mappingMenuItem = (data: Array<RouterItem>,navigate:NavigateFunction) => {
  return data.reduce((prev, cur, index) => {
    if (!cur?.hidden) {
      let menuItem: any = _.pick(cur, ["key", "label", "icon"]);
      if(cur?.to)
      menuItem['onClick'] = ()=>navigate(cur.to)
      if (_.size(cur?.children)) {
        menuItem["children"] = mappingMenuItem(cur?.children,navigate);
      }
      prev.push(menuItem);
    }
    return prev;
  }, []);
};
const MainLayout: React.FC<Props> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const menuItem = useMemo(() => mappingMenuItem(routes,navigate), []);
  const location = useLocation()
  return (
    <Layout style={{ height: "100vh" }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[location.pathname]}
          defaultOpenKeys={[_.split(location.pathname,"/")[1]]}
          items={menuItem}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{
            padding: 0,
          }}
        >
          {React.createElement(
            collapsed
              ? MainLayoutConfig.collapsedIcon
              : MainLayoutConfig.collapseIcon,
            {
              className: "trigger",
              onClick: () => setCollapsed(!collapsed),
            }
          )}
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
