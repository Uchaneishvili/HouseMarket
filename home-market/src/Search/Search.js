import React, { useState } from "react";
import "./Search.css";

function Search() {
  const [minRange, setMinRange] = useState(0);
  const [maxRange, setMaxRange] = useState(5);

  const chooseMinPrice = (e) => {
    setMinRange(e.target.value);
    console.log(e.target.value);
  };

  const chooseMaxPrice = (e) => {
    setMaxRange(e.target.value);
  };
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
              onChange={chooseMinPrice}
            />

            <input
              type="number"
              className="price-range-input"
              defaultValue={0}
              value={minRange}
              onChange={chooseMinPrice}
            />
          </div>

          <label>To :</label>
          <div className="to-range-container">
            <input
              type="range"
              className="form-range price-range"
              min="0"
              max="5"
              step="0.5"
              id="customRange3"
              onChange={chooseMaxPrice}
            />
            <input
              type="number"
              className="price-range-input"
              onChange={chooseMaxPrice}
              value={maxRange}
            />
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
