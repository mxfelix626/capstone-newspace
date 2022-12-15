import React, { useEffect } from "react";
import "./NavBar.css";
import { NavLink } from "react-router-dom";
import { Navbar, Nav, NavItem } from "reactstrap";

const NavBar = ({user, setUser}) => {

  useEffect(() => {
    const isLoggedIn = () => {
      setUser(localStorage.getItem('username'));
    }
    isLoggedIn();
  }, [setUser]);
  

  return (
    <div>
      <Navbar expand="md">
        {user && <Nav>
          <NavItem>
            <NavLink to="/">Home</NavLink>
          </NavItem> 
          {/* <NavItem>
            <NavLink to="/search">Search</NavLink>
          </NavItem> */}
          <NavItem>
            <NavLink to="/posts/new">New Post</NavLink>
          </NavItem>
          {/* <NavItem>
            <NavLink to="/profile">Profile</NavLink>
          </NavItem> */}
          {/* <NavItem>
            <NavLink to="/friends">Friends</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/music">Music</NavLink>
          </NavItem> */}
        </Nav>}
        <Navbar>
          <NavItem>
            {user ? <NavLink to="/logout"> Logout</NavLink> : <NavLink to="/login"> Login</NavLink>}
          </NavItem>
          {!user && <NavItem>
            <NavLink to="/register">Register</NavLink>
          </NavItem>}
        </Navbar>
      </Navbar>
    </div>
  );
}


export default NavBar;
