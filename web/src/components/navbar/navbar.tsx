import React from "react";
import { Link } from "react-router-dom";
//import Button from "./registerbutton/navbtn";

function Navbar(props: any) {
  let navItem = props.name.map((item: any) => {
    return (
      <li key={item.id} className="nav-item">
        <Link to={item.link}>{item.name}</Link>
      </li>
    );
  });

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img src={props.logo} alt={props.logo} />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i className="fa fa-bars" aria-hidden="true"></i>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            {navItem}
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Pages
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <Link to="/error" className="dropdown-item" href="#">
                  Error
                </Link>
                <Link to="/coming_soon" className="dropdown-item" href="#">
                  Comming Soon
                </Link>
              </div>
            </li>
            {/* <Link to="/pricing_plane">
            <Button></Button>
            </Link> */}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
