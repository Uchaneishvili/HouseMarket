import React from "react";
import "./Navigation.css";

function Navigation() {
  return (
    <div className="header">
      <div className="container header-navigation">
        <h4 className="app-name">APP NAME</h4>
        <div className="search">
          <input className="search-input" placeholder="Search" />
          <div className="search-icon-container">
            <img src="./icons/search-icon.svg" className="search-main-icon" />
          </div>
        </div>
        <button type="button" class="btn btn-outline-success add-advertisement">
          <img src="./icons/fi_plus.svg" alt="add" className="add-icon" />
          Add
        </button>
      </div>
    </div>
  );
}

export default Navigation;
