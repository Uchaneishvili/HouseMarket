import React from "react";
import "./AdminUI.css";
import Homelist from "../Homelist/Homelist";
import { Layout, Menu } from "antd";
import { UserOutlined } from "@ant-design/icons";

function AdminUI() {
  const { Content, Footer, Sider } = Layout;
  return (
    <div>
      <Layout>
        <Sider
          style={{
            overflow: "auto",
            height: "100vh",
            position: "fixed",
            left: 0,
          }}
        >
          <div className="logo"></div>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
            <Menu.Item key="1" icon={<UserOutlined />}>
              Home List
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout" style={{ marginLeft: 200 }}>
          <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
            <Homelist />
          </Content>
          <Footer style={{ textAlign: "center" }}></Footer>
        </Layout>
      </Layout>
    </div>
  );
}

export default AdminUI;
