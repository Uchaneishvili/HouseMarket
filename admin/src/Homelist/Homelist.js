import React, { useState, useEffect } from "react";
import "./Homelist.css";
import { Layout, Breadcrumb } from "antd";
import { HomeOutlined, DeleteOutlined } from "@ant-design/icons";
import axios from "axios";
import { Table, Input, Button } from "antd";
const { Search } = Input;

function Homelist() {
  const { Header } = Layout;
  const [homeData, setHomeData] = useState();
  const [current, setCurrent] = useState(1);
  const [total, setTotal] = useState();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async (page, search) => {
    let url = `http://localhost:3001/homelist?page=${page}`;

    if (search) {
      url += `&search=${search}`;
    }

    await axios.get(url).then((response) => {
      setHomeData(response.data.data);
      setTotal(response.data.count);
      setCurrent(response.data.page);
    });
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      width: "20%",
    },
    {
      title: "Name",
      dataIndex: "name",
      width: "20%",
    },
    {
      title: "Floor",
      dataIndex: "floor",
      width: "10%",
    },
    {
      title: "Room",
      dataIndex: "room",
      width: "10%",
    },
    {
      title: "Area",
      dataIndex: "area",
      width: "10%",
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
      dataIndex: "desc",
      width: "30%",
    },

    {
      title: "Action",
      dataIndex: "_id",
      width: "10%",

      fixed: "right",
      render: () => {
        <div>
          <Button>
            <DeleteOutlined />
          </Button>
        </div>;
      },
    },
  ];

  const handleTableChange = (pagination) => {
    loadData(pagination.current, "");
  };

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
            scroll={{ x: 1300 }}
            style={{ marginTop: 20 }}
            dataSource={homeData}
            rowKey={(home) => home._id}
            pagination={{ current: current, pageSize: 12, total: total }}
            onChange={() => handleTableChange()}
          />
        </div>
      </div>
    </div>
  );
}

export default Homelist;
