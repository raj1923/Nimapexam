import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Navbar = ({ onsearch }) => {
  const [searchdata, getsearch] = useState("");
  const handleSearch = () => {
    onsearch(searchdata);
  };
  console.log(onsearch, "daaaaa");

  return (
    <div className="card">
      <div className="parent">
        <ul className="navord">
          <li className="navlist" id="texthead">
            MovieDb
          </li>
          <li className="navlist">
            <NavLink to="/">Popular </NavLink>
          </li>
          <li className="navlist">
            <NavLink to="/TopRated">TopRated </NavLink>
          </li>
          <li className="navlist">
            <NavLink to="/Upcoming">Upcoming </NavLink>
          </li>
          <li className="navlist">
            <input
              type="text"
              placeholder="Movie Name"
              value={searchdata}
              onChange={(e) => getsearch(e.target.value)}
            />
          </li>
          <li className="navlist">
            <button onClick={handleSearch}>Search </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
