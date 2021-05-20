import React from "react";
import "./Search.css";

function Search() {
  return (
    <div className="container">
      <div className="search-container">
        <div className="range-container">
          <label>From :</label>
          <div className="from-range-container">
            <input
              type="range"
              className="form-range price-range"
              min="0"
              max="5"
              step="0.5"
              id="customRange3"
            />

            <input type="number" className="price-range-input" />
          </div>

          <label>To :</label>
          <div className="to-range-container">
            <input
              type="range"
              className="form-range price-range"
              min="0"
              max="5"
              step="0.5"
              id="custom
        Range3"
            />
            <input type="number" className="price-range-input" />
          </div>
        </div>
        <div className="category-container">
          <label>Category :</label>
          <div className="category-buttons-container">
            <button className="btn btn-outline-success category-buttons for-sale">
              For Sale
            </button>
            <button className="btn btn-outline-success category-buttons for-rent">
              For Rent
            </button>
            <button className="btn btn-outline-success category-buttons for-daily-rent">
              For Daily Rent
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Search;
