import React, { useState } from "react";
import "./Search.css";

function Search() {
  const [minRange, setMinRange] = useState(0);
  const [maxRange, setMaxRange] = useState(5);
  const [categoryName, setCategoryName] = useState();
  const [isSelectedCategory, setIsSelectedCategory] = useState("");

  const chooseMinPrice = (e) => {
    setMinRange(e.target.value);
    console.log(e.target.value);
  };

  const chooseMaxPrice = (e) => {
    setMaxRange(e.target.value);
  };

  const handleCategory = (title) => {
    // setCategoryName(title);
    setIsSelectedCategory(title);
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
            <button
              className={
                isSelectedCategory === "For Sale"
                  ? "btn btn-outline-success category-buttons for-sale is-selected"
                  : "btn btn-outline-success category-buttons for-sale"
              }
              onClick={() => handleCategory("For Sale")}
            >
              For Sale
            </button>
            <button
              className={
                isSelectedCategory === "For Rent"
                  ? "btn btn-outline-success category-buttons for-sale is-selected"
                  : "btn btn-outline-success category-buttons for-sale"
              }
              onClick={() => handleCategory("For Rent")}
            >
              For Rent
            </button>
            <button
              className={
                isSelectedCategory === "For Daily Rent"
                  ? "btn btn-outline-success category-buttons for-sale is-selected"
                  : "btn btn-outline-success category-buttons for-sale"
              }
              onClick={() => handleCategory("For Daily Rent")}
            >
              For Daily Rent
            </button>
          </div>
        </div>
        <div>
          <button>search</button>
        </div>
      </div>
    </div>
  );
}

export default Search;
