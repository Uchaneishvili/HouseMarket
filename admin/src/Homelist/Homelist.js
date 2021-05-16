import React, { useState } from "react";
import "./Homelist.css";
import { Layout, Breadcrumb } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import { Table, Input, Button } from "antd";
const { Search } = Input;

function Homelist() {
  const { Header } = Layout;

  const columns = [
    {
      title: "Photo",
      dataIndex: "photo",
    },
    {
      title: "Name",
      dataIndex: "name",
    },

    {
      title: "Type",
      dataIndex: "type",
      filters: [
        { text: "For Sale", value: "for sale" },
        { text: "For Rent", value: "for rent" },
        { text: "For Daily Rent", value: "for daily rent" },
      ],
    },
    {
      title: "Description",
      dataIndex: "description",
      width: "30%",
    },

    {
      title: "Action",
      dataIndex: "action",
      fixed: "right",
    },
  ];

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
        <div>
          <div className="search">
            <Search
              style={{ width: 350 }}
              placeholder="input search text"
              enterButton="Search"
              size="large"
            />
            <Button type="primary" size="large">
              Clear
            </Button>
          </div>
          <Table
            columns={columns}
            rowKey={(record) => record.login.uuid}
            scroll={{ x: 1300 }}
            style={{ marginTop: 20 }}
            //   dataSource={}
            //   pagination={{ current: current, pageSize: 10, total: total }}
            //   loading={loading}
            //   onChange={this.handleTableChange}
          />
        </div>
      </div>
    </div>
  );
}

export default Homelist;
