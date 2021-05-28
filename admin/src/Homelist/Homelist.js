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
  const [searchVal, setSearchVal] = useState();
  const [sortType, setSortType] = useState("default");

  useEffect(() => {
    loadData(1);
  }, []);

  const deleteAdvertisement = async (id) => {
    await axios.delete(`http://localhost:3001/delete/${id}`);
    loadData(current);
  };

  const loadData = async (
    page,
    search,
    sortField,
    sortDirection,
    filterFields
  ) => {
    let url = `http://localhost:3001/homelist?page=${page}`;

    if (search) {
      url += `&search=${search}`;
    }

    if (sortField) {
      url += `&sortField=${sortField}&sortDirection=${sortDirection}`;
    }

    if (filterFields) {
      Object.keys(filterFields).forEach((key) => {
        const joinedFilterValue = filterFields[key]?.join();
        url += `&${key}=${joinedFilterValue}`;
      });
    }

    await axios.get(url).then((response) => {
      setHomeData(response.data.data);
      setTotal(response.data.count);
      setCurrent(response.data.page);
      console.log(response.data.page);
    });
  };

  const resetSearch = () => {
    loadData(1, "");
    setSearchVal("");
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      width: "250px",
    },
    {
      title: "Name",
      dataIndex: "name",
      width: "500px",
    },

    {
      title: "Price ($)",
      dataIndex: "price",
      width: "150px",
      sorter: true,
    },
    {
      title: "Floor",
      dataIndex: "floor",
      width: "150px",
      sorter: true,
    },
    {
      title: "Room",
      dataIndex: "room",
      width: "150px",
      sorter: (a, b, sortDirection) => {
        if (a.room != null && b.room != null) {
          a.room.localeCompare(b.room);
        }
        if (a.room) {
          return sortDirection === "ascend" ? 1 : -1;
        }
        if (b.room) {
          return sortDirection === "ascend" ? -1 : 1;
        }
        return 0;
      },
    },
    {
      title: "Area",
      dataIndex: "area",
      width: "150px",
      sorter: true,
    },
    {
      title: "Address",
      dataIndex: "address",
      width: "250px",
    },
    {
      title: "Type",
      dataIndex: "category",
      width: "150px",
      filters: [
        { text: "For Sale", value: "for sale" },
        { text: "For Rent", value: "for rent" },
        { text: "For Daily Rent", value: "for daily rent" },
      ],
    },
    {
      title: "Description",
      dataIndex: "desc",
      width: "500px",
    },

    {
      title: "Action",
      dataIndex: "_id",
      width: "150px",
      fixed: "right",
      render: (id) => (
        <div>
          <Button
            className="delete-button"
            onClick={() => deleteAdvertisement(id)}
          >
            <DeleteOutlined />
          </Button>
        </div>
      ),
    },
  ];

  const handleTableChange = (pagination, filters, sorter) => {
    loadData(pagination.current, "", sorter.field, sorter.order, filters);
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
          <pre>{JSON.stringify(homeData)}</pre>
          <div className="search">
            <Search
              style={{ width: 350 }}
              placeholder="input search text"
              enterButton="Search"
              size="large"
              value={searchVal}
              onChange={(event) => setSearchVal(event.target.value)}
              onSearch={() => loadData(1, searchVal)}
            />
            <Button type="primary" size="large" onClick={() => resetSearch()}>
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
            onChange={handleTableChange}
          />
        </div>
      </div>
    </div>
  );
}

export default Homelist;
