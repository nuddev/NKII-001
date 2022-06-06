import { MainLayoutConfig } from "@/config/main-layout-config";
import { routes } from "@/config/routes";
import { RouterItem } from "@/models/Router";
import logo from "@images/react-brands.svg";
import {
  BellOutlined,
  CaretDownOutlined,
  ExportOutlined,
  MailOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Badge, Button, Layout, Menu, Popover, Row } from "antd";
import _ from "lodash";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  matchPath,
  NavigateFunction,
  useLocation,
  useMatch,
  useNavigate,
} from "react-router-dom";
import "./index.less";
const { Header, Sider, Content } = Layout;
type Props = {
  children: React.ReactNode;
};
const mappingMenuItem = (
  data: Array<RouterItem>,
  navigate: NavigateFunction
) => {
  return data.reduce((prev, cur, index) => {
    if (!cur?.hidden) {
      let menuItem: any = _.pick(cur, ["key", "label", "icon"]);
      if (cur?.to) menuItem["onClick"] = () => navigate(cur.to);
      if (_.size(cur?.children)) {
        menuItem["children"] = mappingMenuItem(cur?.children, navigate);
      }
      prev.push(menuItem);
    }
    return prev;
  }, []);
};
const content = (
  <div className="flex flex-col w-[9.875rem]">
    <Row className="gap-2 py-3 px-4" align="middle">
      <UserOutlined className="text-xs" />
      <span className="text-xs">Profile</span>
    </Row>
    <Row className="gap-2 py-3 px-4" align="middle">
      <MailOutlined className="text-xs" />
      <span className="text-xs">Inbox</span>
    </Row>
  </div>
);

const MainLayout: React.FC<Props> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const menuItem = useMemo(() => mappingMenuItem(routes, navigate), []);
  const location = useLocation();

  return (
    <Layout style={{ height: "100vh" }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        className="rounded-md drop-shadow-m"
      >
        <Row justify="center">
          <img className="logo m" src={logo} />
        </Row>
        <Menu
          mode="inline"
          defaultSelectedKeys={[location.pathname]}
          defaultOpenKeys={[_.split(location.pathname, "/")[1]]}
          items={menuItem}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background mx-4 mt-4 rounded-md drop-shadow-md"
          style={{
            padding: 0,
            height: "3.75rem",
          }}
        >
          <Row justify="space-between">
            {React.createElement(
              collapsed
                ? MainLayoutConfig.collapsedIcon
                : MainLayoutConfig.collapseIcon,
              {
                className: "trigger",
                onClick: () => setCollapsed(!collapsed),
              }
            )}
            <Row className="pr-6 gap-7" align="middle">
              <Badge count={10}>
                <MailOutlined className="text-lg" />
              </Badge>

              <Badge count={5}>
                <BellOutlined className="text-lg" />
              </Badge>
              <Row className="gap-4" align="middle">
                <Avatar
                  icon={<img src="https://picsum.photos/seed/picsum/200/300" />}
                />
                <Row align="middle" className="cursor-pointer gap-2">
                  <Popover
                    overlayClassName="profile-menu"
                    placement="bottom"
                    content={content}
                    trigger="click"
                  >
                    <span>Admin</span>
                  </Popover>
                  <CaretDownOutlined />
                </Row>
              </Row>

              <ExportOutlined className="text-lg" />
            </Row>
          </Row>
        </Header>
        <Content
          className="content-layout mx-4 mt-4"
          style={{
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
