import React from "react";
import "./Scrollup.css";

function Scrollup() {
  return (
    <div className="scroll-up-container">
      <div className="scroll-up-image-container">
        <img
          src="./icons/scroll-up-arrow.svg"
          className="scroll-up-image"
          alt="Scroll Up"
        />
      </div>
    </div>
  );
}

export default Scrollup;
