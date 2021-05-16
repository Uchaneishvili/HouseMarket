import React from "react";
import "./Homelist.css";
import { Layout, Breadcrumb } from "antd";
import { HomeOutlined } from "@ant-design/icons";

function Homelist() {
  const { Header } = Layout;

  return (
    <div>
      <div className="breadcrumbs-container">
        <div className="breadCrumb">
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item href="/">
              <HomeOutlined />
            </Breadcrumb.Item>
            <Breadcrumb.Item>Home List</Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </div>
      <div
        className="site-layout-background"
        style={{ padding: 24, textAlign: "start", marginTop: 10 }}
      >
        <Header
          className="site-layout-background page-title"
          style={{ padding: 0 }}
        >
          Home List
        </Header>
      </div>
    </div>
  );
}

export default Homelist;
