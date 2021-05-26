import React, { useState } from "react";
import "./Navigation.css";
import CreateNew from "../Add/Create.js";
import Search from "../Search/Search";
import { BrowserRouter as Router, Link } from "react-router-dom";

function Navigation(props) {
  const [openPopup, setOpenPopup] = useState(false);
  const [detailSearch, setDetailSearch] = useState(false);
  const [search, setSearch] = useState("");

  const modalFnct = () => {
    setOpenPopup(true);
  };

  const exitModalFnct = () => {
    setOpenPopup(false);
  };

  const searchOnclick = (e) => {
    setDetailSearch(true);
  };

  const onSearch = () => {
    props.loadData(1, search);
    setDetailSearch(false);
  };

  const onMainTitle = () => {
    props.loadData(1, "");
    setSearch("");
  };
  return (
    <div className="header">
      <div className="container header-navigation">
        <Router>
          <Link to="/">
            <h4 className="app-name" onClick={() => onMainTitle()}>
              APP NAME
            </h4>
          </Link>
        </Router>
        <div className="search">
          <input
            className="search-input"
            placeholder="Search"
            name="searchinput"
            id="search-input"
            value={search}
            onClick={() => searchOnclick()}
            onChange={(event) => setSearch(event.target.value)}
          />
          <div className="search-icon-container" onClick={() => onSearch()}>
            <img
              src="./icons/search-icon.svg"
              className="search-main-icon"
              alt="search icon"
            />
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
