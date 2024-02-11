import React from "react";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { activeNavTab, navTabs, notactiveNavTab } from "../utils/constant";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Nav, Navbar, NavbarBrand } from "react-bootstrap";

function CustomNavbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };
  return (
    <Navbar expand="lg" className="bg-body-tertiary sticky-top">
      <Container>
        <NavbarBrand>Lecture Scheduler</NavbarBrand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="ms-auto" />
        <Navbar.Collapse id="basic-navbar-nav">
          {localStorage.getItem("userType") === "admin" && (
            <Nav className="m-auto">
              {navTabs &&
                navTabs.map((nav) => (
                  <Nav.Link
                    onClick={() => navigate(nav?.navigate)}
                    key={nav.id}
                    style={
                      location.pathname === nav?.navigate
                        ? activeNavTab
                        : notactiveNavTab
                    }
                    className="pointer fw-medium"
                  >
                    {nav?.name}
                  </Nav.Link>
                ))}
            </Nav>
          )}
          <Nav>
            <Nav.Link onClick={handleLogout}>
              <RiLogoutCircleRLine size={"25px"} />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CustomNavbar;
