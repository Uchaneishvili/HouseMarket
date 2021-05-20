import React from "react";
import "./Scrollup.css";

function Scrollup() {
  const scrollToTheTop = () => {
    window.scrollTo(0, 0);
  };
  return (
    <div className="scroll-up-container" onClick={() => scrollToTheTop()}>
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
