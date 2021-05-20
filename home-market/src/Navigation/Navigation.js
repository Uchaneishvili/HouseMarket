import React, { useState } from "react";
import "./Navigation.css";
import CreateNew from "../Add/Create.js";
import Search from "../Search/Search";

function Navigation() {
  const [openPopup, setOpenPopup] = useState(false);
  const [detailSearch, setDetailSearch] = useState(false);

  const modalFnct = () => {
    setOpenPopup(true);
  };

  const exitModalFnct = () => {
    setOpenPopup(false);
  };

  const searchOnclick = () => {
    setDetailSearch(true);
  };

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
            onClick={() => searchOnclick()}
          />
          <div className="search-icon-container">
            <img src="./icons/search-icon.svg" className="search-main-icon" />
          </div>
        </div>
        <button
          type="button"
          class="btn btn-outline-success add-advertisement"
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
