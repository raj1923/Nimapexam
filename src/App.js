import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "../Navbar";
import "./styles.css";
const Popularlazy = React.lazy(() => import("../Popular"));
const Topratedlazy = React.lazy(() => import("../TopRated"));
const Upcominglazy = React.lazy(() => import("../Upcomming"));

const App = () => {
  const [finaldata, getfinaldata] = useState("");
  const handleSearch = (query) => {
    getfinaldata(query);
  };

  console.log(finaldata, "searchdata");
  return (
    <div className="App">
      <Router>
        <Navbar onsearch={handleSearch} />
        <Routes>
          <Route
            path="/"
            element={
              <React.Suspense>
                <Popularlazy searchdata={finaldata} />
              </React.Suspense>
            }
          />
          <Route
            path="/TopRated"
            element={
              <React.Suspense>
                <Topratedlazy searchdata={finaldata} />
              </React.Suspense>
            }
          />
          <Route
            path="/Upcoming"
            element={
              <React.Suspense>
                <Upcominglazy searchdata={finaldata} />
              </React.Suspense>
            }
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
