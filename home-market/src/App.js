import "./App.css";
import Grid from "./Grid/Grid";
import Footer from "./Footer/Footer";
import Scrollup from "./ScrollUp/Scrollup";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Detail from "./Detail/Detail";
import LoadContextProvider from "./loadContext";

function App() {
  return (
    <LoadContextProvider>
      <div>
        <Router>
          <Route path="/" exact component={Grid} />
          <Route path="/homelist" component={Detail} />
          <Route path="/" component={Scrollup} />

          <Route path="/" component={Footer} />
        </Router>
      </div>
    </LoadContextProvider>
  );
}

export default App;
