import React, { createContext } from "react";

export const loadDataContext = createContext();

function loadContext(props) {
  return (
    <div>
      <loadDataContext.Provider value={"hello world"}>
        {props.children}
      </loadDataContext.Provider>
    </div>
  );
}

export default loadContext;
