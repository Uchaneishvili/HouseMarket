import React, { createContext, useState } from "react";
import axios from "axios";

export const loadDataContext = createContext();

function LoadContextProvider(props) {
  const [totalPages, setTotalPages] = useState();
  const [listOfHome, setListOfHome] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loadMore, setLoadMore] = useState();
  const [detailSearch, setDetailSearch] = useState(false);

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

  return (
    <div>
      <loadDataContext.Provider value={() => clearAndLoadData()}>
        {props.children}
      </loadDataContext.Provider>
    </div>
  );
}

export default LoadContextProvider;
