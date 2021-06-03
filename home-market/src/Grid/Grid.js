import React, { useEffect, useState, useContext } from "react";
import "./Grid.css";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import Navigation from "../Navigation/Navigation";
import Detail from "../Detail/Detail";
import Search from "../Search/Search";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import loadContext, { loadDataContext } from "../loadContext";

function Grid(props) {
  const [listOfHome, setListOfHome] = useState([]);
  const [totalPages, setTotalPages] = useState();
  const [loadMore, setLoadMore] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [detailSearchIsOpen, setDetailSearchIsOpen] = useState(false);

  const contextValue = useContext(loadDataContext);

  useEffect(() => {
    loadData(1);
    console.log(contextValue);
  }, []);

  const nextLoad = () => {
    setTimeout(() => {
      loadData(currentPage + 1);
    }, 1500);
  };
  const clearAndLoadData = async (
    page,
    search,
    category,
    minPrice,
    maxPrice
  ) => {
    setListOfHome([]);

    let url = `http://localhost:3001/homelist?page=${page}`;
    if (search) {
      url += `&search=${search}`;
    }

    if (category) {
      url += `&category=${category}`;
    }

    if (minPrice) {
      url += `&minPrice=${minPrice}`;
    }

    if (maxPrice) {
      url += `&maxPrice=${maxPrice}`;
    }

    await axios.get(url).then((response) => {
      const newData = [...response.data.data];
      setListOfHome(newData);
      setTotalPages(response.data.pages);
      setCurrentPage(response.data.page);
      const totalPagesData = response.data.pages;
      const currentPageData = response.data.page;
      console.log(totalPages);
      if (totalPagesData > currentPageData) {
        setLoadMore(true);
      } else {
        setLoadMore(false);
      }
    });
    // setTimeout(() => {
    //   loadData(page, search, category, minPrice, maxPrice);
    // }, 1500);
  };

  const loadData = async (page, search, category, minPrice, maxPrice) => {
    let url = `http://localhost:3001/homelist?page=${page}`;
    if (search) {
      url += `&search=${search}`;
    }

    if (category) {
      url += `&category=${category}`;
    }

    if (minPrice) {
      url += `&minPrice=${minPrice}`;
    }

    if (maxPrice) {
      url += `&maxPrice=${maxPrice}`;
    }

    await axios.get(url).then((response) => {
      console.log(response.data.data);
      const newData = [...listOfHome, ...response.data.data];
      setListOfHome(newData);
      setTotalPages(response.data.pages);
      setCurrentPage(response.data.page);
      const totalPagesData = response.data.pages;
      const currentPageData = response.data.page;

      console.log(totalPages);
      if (totalPagesData > currentPageData) {
        setLoadMore(true);
      } else {
        setLoadMore(false);
      }
    });
  };

  return (
    <div>
      <Navigation
        setListOfHome={setListOfHome}
        loadData={clearAndLoadData}
        detailSearchIsOpen={detailSearchIsOpen}
      />
      <Search
        loadData={clearAndLoadData}
        detailSearchIsOpen={detailSearchIsOpen}
      />
      <div className="container grid-container">
        <div className="cards-container">
          <InfiniteScroll
            pageStart={0}
            dataLength={listOfHome.length}
            next={() => nextLoad()}
            style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
            hasMore={loadMore}
            loader={<h4>Loading...</h4>}
          >
            {listOfHome.map((home) => {
              return (
                <Link to={`/homelist/${home._id}`} key={home._id}>
                  <div className="card house-card">
                    <img
                      width="300px"
                      height="170px"
                      src={home.image}
                      className="card-img-top cart-image"
                      alt={home.name}
                    />
                    <div className="card-body">
                      <p className="card-title">{home.name}</p>
                      <p className="card-category">{home.category}</p>
                      <div className="home-parameters-container">
                        <div className="home-parameters">
                          <p className="card-floor"> სარ. {home.floor}</p>
                          <p className="card-room"> ოთ. {home.room}</p>
                        </div>

                        <p className="card-area"> ფართ: {home.area} მ²</p>
                      </div>
                      <p className="card-text desc">{home.desc}</p>
                      <p className="card-text price">{home.price} $</p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </InfiniteScroll>
        </div>
      </div>
    </div>
  );
}

export default Grid;
