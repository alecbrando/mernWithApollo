import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Menu } from "semantic-ui-react";

import { AuthContext } from "../context/auth";

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const pathname = window.location.pathname;
  console.log(pathname);
  const [activeState, setActiveState] = useState(
    pathname === "/"
      ? "home"
      : pathname === "/login"
      ? "login"
      : pathname === "/register"
      ? "register"
      : ""
  );
  const navBar = user ? (
    <div>
      <Menu pointing secondary size="massive" color="teal">
        <Menu.Item name={user.username} active as={Link} to="/" />
        <Menu.Menu position="right">
          <Menu.Item name="logout" onClick={() => logout()} as={Link} to="/" />
        </Menu.Menu>
      </Menu>
    </div>
  ) : (
    <div>
      <Menu pointing secondary size="massive" color="teal">
        <Menu.Item
          name="home"
          active={activeState === "home"}
          onClick={() => setActiveState("home")}
          as={Link}
          to="/"
        />
        <Menu.Menu position="right">
          <Menu.Item
            name="login"
            active={activeState === "login"}
            onClick={() => setActiveState("login")}
            as={Link}
            to="/login"
          />
          <Menu.Item
            name="register"
            active={activeState === "register"}
            onClick={() => setActiveState("register")}
            as={Link}
            to="/register"
          />
        </Menu.Menu>
      </Menu>
    </div>
  );

  return navBar;
}

export default Navbar;
