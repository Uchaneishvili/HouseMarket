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
          src="https://firebasestorage.googleapis.com/v0/b/home-market-98990.appspot.com/o/scroll-up-arrow.svg?alt=media&token=a12172b0-ef4b-43cf-b6d1-bda864d4da45"
          className="scroll-up-image"
          alt="Scroll Up"
        />
      </div>
    </div>
  );
}

export default Scrollup;
