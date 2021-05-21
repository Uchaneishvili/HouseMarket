import React, { useState } from "react";
import "./Navigation.css";
import CreateNew from "../Add/Create.js";
import Search from "../Search/Search";

function Navigation(props) {
  const [openPopup, setOpenPopup] = useState(false);
  const [detailSearch, setDetailSearch] = useState(false);
  const [search, setSearch] = useState("");
  const [defaultValue, setDefaultValue] = useState(false);

  const modalFnct = () => {
    setOpenPopup(true);
  };

  const exitModalFnct = () => {
    setOpenPopup(false);
  };

  const searchOnclick = () => {
    setDetailSearch(true);
  };

  // const searchInput = (event) => {
  //   if (defaultValue) {
  //     setSearch("");
  //   } else {
  //     setSearch(event.target.value);
  //   }
  // };

  return (
    <div className="header">
      <div className="container header-navigation">
        <h4 className="app-name">APP NAME</h4>
        <div className="search">
          <input
            className="search-input"
            placeholder="Search"
            name="searchinput"
            id="search-input"
            value={search}
            onClick={() => searchOnclick()}
            onChange={(event) =>
              defaultValue ? setSearch("") : setSearch(event.target.value)
            }
          />
          <div
            className="search-icon-container"
            onClick={() => props.loadData(1, search)}
          >
            <img src="./icons/search-icon.svg" className="search-main-icon" />
          </div>
        </div>
        <button
          type="button"
          className="btn btn-outline-success add-advertisement"
          onClick={modalFnct}
        >
          <img src="./icons/fi_plus.svg" alt="add" className="add-icon" />
          Add
        </button>
      </div>
      <CreateNew openPopup={openPopup} exitModalFnct={exitModalFnct} />
      {detailSearch ? <Search /> : ""}
    </div>
  );
}

export default Navigation;
