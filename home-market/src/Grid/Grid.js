import React, { useEffect, useState, useContext } from "react";
import "./Grid.css";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import Navigation from "../Navigation/Navigation";
import { Link } from "react-router-dom";
import { loadDataContext } from "../loadContext";
import Outside from "../Sort/Outside";

function Grid() {
  const [listOfHome, setListOfHome] = useState([]);
  const [loadMore, setLoadMore] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [detailSearchIsOpen, setDetailSearchIsOpen] = useState(false);
  const [sortType, setSortType] = useState(0);

  const contextValue = useContext(loadDataContext);

  const sort = () => {
    if (sortType === 1) {
      clearAndLoadData(1, "", "price", "ascend");
    } else if (sortType === 2) {
      clearAndLoadData(1, "", "price", "descend");
    } else if (sortType === 0) {
      clearAndLoadData(1);
    }
  };

  useEffect(() => {
    loadData(1);
  }, []);

  const nextLoad = () => {
    setTimeout(() => {
      loadData(currentPage + 1);
    }, 1500);
  };
  const clearAndLoadData = async (
    page,
    search,
    sortField,
    sortDirection,
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

    if (sortField) {
      url += `&sortField=${sortField}&sortDirection=${sortDirection}`;
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
      setCurrentPage(response.data.page);
      const totalPagesData = response.data.pages;
      const currentPageData = response.data.page;
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

  const loadData = async (
    page,
    search,
    sortField,
    sortDirection,
    category,
    minPrice,
    maxPrice
  ) => {
    let url = `http://localhost:3001/homelist?page=${page}`;
    if (search) {
      url += `&search=${search}`;
    }

    if (sortField) {
      url += `&sortField=${sortField}&sortDirection=${sortDirection}`;
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
      const newData = [...listOfHome, ...response.data.data];
      setListOfHome(newData);
      setCurrentPage(response.data.page);
      const totalPagesData = response.data.pages;
      const currentPageData = response.data.page;

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
      <div className="container grid-container">
        <Outside sort={sort} sortType={sortType} setSortType={setSortType} />

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
