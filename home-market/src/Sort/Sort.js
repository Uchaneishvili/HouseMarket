import React, { useState, useEffect } from "react";
import "./Sort.css";

function Sort(props) {
  const [sortState, setSortState] = useState(false);

  const rotateIcon = () => {
    setSortState(!sortState);
    console.log(sortState);
  };

  const defaultSort = () => {
    props.setSortType(0); //Default Sorting
  };

  const priceAscSort = () => {
    props.setSortType(1); // Ascend Sorting
  };

  const priceDescSort = () => {
    props.setSortType(2); // Descend Sorting
  };

  useEffect(() => {
    console.log(props.sortType);

    props.sort();
  }, [props.sortType]);

  return (
    <div className="container">
      <div className="sort-dropdown-container">
        <div className="sort-dropdown" onClick={rotateIcon}>
          სორტირება
          <img
            className={sortState ? "sort-icon" : "sort-icon rotate"}
            alt="sort-icon"
            src="https://firebasestorage.googleapis.com/v0/b/home-market-98990.appspot.com/o/Sort.svg?alt=media&token=24183140-5dac-45ff-8a5c-ace8fd45a146"
          />
        </div>

        {sortState && (
          <ul className="dropdown-menu dropdown-list">
            <li>
              <a
                className="dropdown-item"
                href="#"
                onClick={() => defaultSort()}
              >
                სორტირება
              </a>
            </li>
            <li>
              <a
                className="dropdown-item"
                href="#"
                onClick={() => priceAscSort()}
              >
                ფასის ზრდადობით
              </a>
            </li>
            <li>
              <a
                className="dropdown-item"
                href="#"
                onClick={() => priceDescSort()}
              >
                ფასის კლებადობით
              </a>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
}

export default Sort;
