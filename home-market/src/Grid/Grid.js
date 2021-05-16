import React from "react";
import "./Grid.css";

function Grid() {
  const generateCardRow = () => {
    const cardRow = [];
    for (let row = 1; row <= 4; row++) {
      cardRow.push(
        <div className="row grid-row-container">{generateCardColumn()}</div>
      );
    }
    return cardRow;
  };

  const generateCardColumn = () => {
    const cardColumn = [];
    for (let col = 1; col <= 4; col++) {
      cardColumn.push(
        <div className="col grid-col-container">
          <div class="card house-card">
            <img
              src="https://assets.architecturaldigest.in/photos/600845b5eebcfd50ede87936/16:9/w_2560%2Cc_limit/Bengaluru-home-Bodhi-Design-Studio-17-1366x768.jpg"
              class="card-img-top cart-image"
              alt="..."
            />
            <div class="card-body">
              <p className="card-title">House for sale</p>
              <p class="card-text desc">
                47.7 sq.m. apartment for sale on the 5th floor (10 floors in
                total) Green frame Price: 47 700 $.
              </p>
              <div className="dollar-price">
                <p className="card-text price">47 700</p>
                <img
                  className="dollar-sign"
                  alt="dollar"
                  src="./icons/fi_dollar-sign.svg"
                />
              </div>
            </div>
          </div>
        </div>
      );
    }

    return cardColumn;
  };

  return <div className="container grid-container">{generateCardRow()}</div>;
}

export default Grid;
