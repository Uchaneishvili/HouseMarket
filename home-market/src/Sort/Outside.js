import React, { useState, useEffect, useRef } from "react";
import "./Outside.css";

function Outside(props) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef();

  const toggle = () => {
    rotateIcon();
  };

  Outside.handleClickOutside = () => setIsOpen(false);

  useOnClickOutside(ref, () => setIsOpen(false));

  const rotateIcon = () => {
    setIsOpen(!isOpen);
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
    props.sort();
  }, [props.sortType]);
  return (
    <div
      className={isOpen ? "m-menu -active" : "m-menu "}
      onClick={() => setIsOpen(!isOpen)}
      ref={ref}
    >
      <div className="sort-title-container">
        <div className="sort-title" onClick={toggle}>
          {props.sortType === 0 ? "სორტირება" : ""}
          {props.sortType === 1 ? "ფასის ზრდადობით" : ""}
          {props.sortType === 2 ? "ფასის კლებადობით" : ""}
          <img
            className={isOpen ? "sort-icon" : "sort-icon rotate"}
            alt="sort-icon"
            src="https://firebasestorage.googleapis.com/v0/b/home-market-98990.appspot.com/o/Sort.svg?alt=media&token=24183140-5dac-45ff-8a5c-ace8fd45a146"
          />
        </div>
      </div>
      <ul className="m-menu__list">
        <div className="m-menu__item">
          <div className="m-menu__link">
            <li className="menu-items" onClick={() => defaultSort()}>
              სორტირება
            </li>
            <li className="menu-items" onClick={() => priceAscSort()}>
              ფასის ზრდადობით
            </li>
            <li className="menu-items" onClick={() => priceDescSort()}>
              ფასის კლებადობით
            </li>
          </div>
        </div>
      </ul>
    </div>
  );
}

function useOnClickOutside(ref, handler) {
  useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
}

export default Outside;
