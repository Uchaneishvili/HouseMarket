import React, { useState } from "react";
import "./Sort.css";

function Sort() {
  const [sortState, setSortState] = useState(true);

  const rotateIcon = () => {
    setSortState(!sortState);
    console.log(sortState);
  };

  return (
    <div className="container">
      <div className="sort-dropdown-container" onClick={rotateIcon}>
        <div className="sort-dropdown">
          სორტირება
          <img
            className={sortState ? "sort-icon" : "sort-icon rotate"}
            alt="sort-icon"
            src="https://firebasestorage.googleapis.com/v0/b/home-market-98990.appspot.com/o/Sort.svg?alt=media&token=24183140-5dac-45ff-8a5c-ace8fd45a146"
          />
        </div>

        {sortState && (
          <ul class="dropdown-menu dropdown-list">
            <li>
              <a class="dropdown-item" href="#">
                სორტირება
              </a>
            </li>
            <li>
              <a class="dropdown-item" href="#">
                ფასის ზრდადობით
              </a>
            </li>
            <li>
              <a class="dropdown-item" href="#">
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
