import React, { useEffect, useState } from "react";
import "./Grid.css";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import Navigation from "../Navigation/Navigation";

function Grid() {
  const [listOfHome, setListOfHome] = useState([]);
  const [totalPages, setTotalPages] = useState();
  const [loadMore, setLoadMore] = useState();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    loadData(1);
  }, []);

  useEffect(() => {
    console.log(currentPage);
    console.log(totalPages);
    console.log(loadMore);
  }, [currentPage]);

  const nextLoad = () => {
    setTimeout(() => {
      loadData(currentPage + 1);
    }, 1500);
  };

  const loadData = async (page, search) => {
    let url = `http://localhost:3001/homelist?page=${page}`;
    if (search) {
      url += `&search=${search}`;
    }
    await axios.get(url).then((response) => {
      setListOfHome(response.data.data);
      setTotalPages(response.data.pages);
      setCurrentPage(response.data.page);
      if (totalPages > currentPage) {
        setLoadMore(true);
      } else {
        setLoadMore(false);
      }
    });
  };

  return (
    <div>
      <Navigation loadData={loadData} />
      <div className="container grid-container">
        <pre>{JSON.stringify(listOfHome)}</pre>
        <div className="cards-container">
          <InfiniteScroll
            pageStart={0}
            dataLength={listOfHome.length}
            next={() => nextLoad()}
            style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }} //To put endMessage and loader to the top.
            hasMore={loadMore}
            loader={<h4>Loading...</h4>}
          >
            {listOfHome.map((home) => {
              return (
                <div className="card house-card" key={home._id}>
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
              );
            })}
          </InfiniteScroll>
        </div>
      </div>
    </div>
  );
}

export default Grid;
