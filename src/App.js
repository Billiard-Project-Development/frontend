import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/Home";
import NavigationBar from "./components/NavigationBar";

function App() {
  return (
    <div className="z-auto mx-auto font-body bg-primarySoftGrey">
      <Router>
        <NavigationBar />
        <Routes>
          <Route>
            <Route path="/" element={<Home />}></Route>
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
