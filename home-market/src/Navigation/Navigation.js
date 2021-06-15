import React, { useContext, useState } from "react";
import "./Navigation.css";
import CreateNew from "../Add/Create.js";
import { loadDataContext } from "../loadContext";
import Search from "../Search/Search";
import { Link } from "react-router-dom";

function Navigation() {
  const [openPopup, setOpenPopup] = useState(false);
  const [search, setSearch] = useState("");
  const contextValue = useContext(loadDataContext);

  const modalFnct = () => {
    setOpenPopup(true);
  };

  const exitModalFnct = () => {
    setOpenPopup(false);
  };

  const searchOnclick = () => {
    contextValue.setIsOpen(true);
  };

  const onMainTitle = () => {
    if (!window.location.pathname.includes("homelist")) {
      setTimeout(() => {
        return () => contextValue;
      }, 1500);
    }

    window.scroll(0, 0);
  };

  return (
    <div className="header">
      <div className="container header-navigation">
        <Link to="/">
          <h4 className="app-name" onClick={() => onMainTitle()}>
            APP NAME
          </h4>
        </Link>
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
          <div className="search-icon-container">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/home-market-98990.appspot.com/o/search-icon.svg?alt=media&token=d55be6c1-3e62-4cc7-8f7d-53230907a9b9"
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
          <img
            src="https://firebasestorage.googleapis.com/v0/b/home-market-98990.appspot.com/o/fi_plus.svg?alt=media&token=2426bd5f-2c6e-46e1-8d72-5cac1dd6ff75"
            alt="add"
            className="add-icon"
          />
          Add
        </button>
      </div>
      <CreateNew openPopup={openPopup} exitModalFnct={exitModalFnct} />
      {contextValue.isOpen ? <Search /> : ""}
    </div>
  );
}

export default Navigation;
