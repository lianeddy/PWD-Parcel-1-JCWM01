import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import UpperText from "./UpperText";

function Navbar() {
  const [click, setClick] = useState(true);

  const clickHandler = () => {
    setClick(!click);
    console.log(click);
  };

  const revertNavMenu = () => {
    if ((window.innerWidth < 959) & (window.innerWidth > 960)) {
      setClick(true);
    }
  };

  useEffect(() => {
    revertNavMenu();
  }, []);

  window.addEventListener("resize", revertNavMenu);

  return (
    <>
      <UpperText />
      <nav className="navbar">
        <div className="navbar-container">
          {/* grey holder skin - when hamburger menu active */}
          <div
            className={click ? "none" : "grey-holder"}
            onClick={click ? "" : clickHandler}
          ></div>
          <div className="navbar-logoArea">
            <Link className="nav-logo" to="/">
              <div className="nav-logo-brand">
                <p className="fontBig fw-500 spacing5 font-nunito">NIKKEN</p>
                <p className="fontSmall fw-700 spacing2 pl-2 font-nunito">
                  EXPERIENCE SOMETHING
                </p>
              </div>
              <i className="far fa-comment-alt nav-logo-picture"></i>
            </Link>
          </div>

          <div className="burger-icon-normal" onClick={clickHandler}>
            <i className="fas fa-bars fas-fixed"></i>
          </div>

          {/* HAMBURGER MENU (max-width : 960px) */}
          <div
            className={
              click
                ? "navbar-menuArea-burger"
                : "navbar-menuArea-burger--active"
            }
          >
            <div className="burger-icon">
              <p className="fontMed fw-500 spacing5">NIKKEN</p>
              <i
                className="fas fa-bars fontMed burger-icon-fixed"
                onClick={clickHandler}
              ></i>
            </div>
            <ul className="burger-list">
              <li className="burger-listItem">
                <i className="fas fa-home" />
                <Link className="burger-link">Home</Link>
              </li>
              <li className="burger-listItem">
                <i className="fas fa-hands-helping" />
                <Link className="burger-link">Service</Link>
              </li>
              <li className="burger-listItem">
                <i className="fas fa-box-open" />
                <Link className="burger-link">Product</Link>
              </li>
              <li className="burger-listItem">
                <i className="fas fa-envelope" />
                <Link className="burger-link">Contact</Link>
              </li>
              <br className="burger-line" />
              <p>line breaker</p>
              <li className="burger-listItem">
                <Link className="burger-link">SERVICE</Link>
              </li>
              <li className="burger-listItem">
                <Link className="burger-link">PRODUCT</Link>
              </li>
              <li className="burger-listItem">
                <Link className="burger-link">CONTACT</Link>
              </li>
            </ul>
          </div>

          {/* NORMAL MENU */}
          <div className="navbar-menuArea">
            <ul className="nav-list">
              <li className="nav-listItem">
                <Link className="nav-link">HOME</Link>
              </li>
              <li className="nav-listItem">
                <Link className="nav-link">SERVICE</Link>
              </li>
              <li className="nav-listItem">
                <Link className="nav-link">PRODUCT</Link>
              </li>
              <li className="nav-listItem">
                <Link className="nav-link">CONTACT</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
