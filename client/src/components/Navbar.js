import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu } from "semantic-ui-react";

function Navbar() {
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

  return (
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
}

export default Navbar;
