import React from "react";
import {
  Navbar,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  NavbarBrand,
  NavbarText,
  DropdownMenu,
  DropdownItem,
  Nav,
} from "reactstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./Navbar.css";

function MyNavbar() {
  return (
    <div>
      <Navbar color="light" light className="nav-container">
        <NavbarBrand className="nav-logo">
          <Link to="/" className="nav-logo-link">
            Parcel Shop
          </Link>
          <i className="fas fa-shopping-cart nav-logo-item" />
        </NavbarBrand>
        <Nav className="nav-menu">
          {/* {this.props.userGlobal.email ? (
            <>
              <NavItem>
                <NavbarText>Hello, {this.props.userGlobal.email}</NavbarText>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Pages
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    <Link to="/cart">
                      Cart ({this.props.cartGlobal.cartList.length})
                    </Link>
                  </DropdownItem>
                  <DropdownItem>
                    <Link to="/history">History</Link>
                  </DropdownItem>
                  {this.props.userGlobal.role === "admin" ? (
                    <DropdownItem>
                      <Link to="/admin">Admin</Link>
                    </DropdownItem>
                  ) : null}
                  <DropdownItem divider />
                  <DropdownItem onClick={this.props.logoutUser}>
                    Logout
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </>
          ) :  */}
          (
          <NavItem>
            <NavbarText>
              <Link to="/login" className="nav-login">
                Login
              </Link>
              <Link to="/register" className="nav-register">
                Register
              </Link>
            </NavbarText>
          </NavItem>
          ){/* } */}
        </Nav>
      </Navbar>
    </div>
  );
}

// const mapStateToProps = (state) => {
//   return {
//     userGlobal: state.user,
//     cartGlobal: state.cart,
//   };
// };

// const mapDispatchToProps = {
//   logoutUser,
// };

// export default connect(mapStateToProps, mapDispatchToProps)(MyNavbar);
export default MyNavbar;
