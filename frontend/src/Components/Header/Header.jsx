import React from "react";
import { Navbar, Nav, Container, Badge, NavDropdown } from "react-bootstrap";
import { FaUser, FaShoppingCart } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { setlogout } from "../../slices/AuthSlice";
import { useLogoutMutation } from "../../slices/UsersApiSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import SearchBox from "../searchbox/SearchBox";

const Header = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { UserInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logout] = useLogoutMutation();
  const logouthandler = async () => {
    try {
      dispatch(setlogout());
      navigate("/login");
      const res = await logout().unwrap();
      console.log(res);
      toast.success(res.user);
    } catch (error) {
      // toast.error(error.error || error?.data?.message);
      console.log(error);
    }
  };
  return (
    <>
      <header>
        <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
          <Container>
            <LinkContainer to="/">
              <Navbar.Brand>LOGO</Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto" style={{ marginRight: "50px" }}>
                <SearchBox />
                <LinkContainer to="/cart">
                  <Nav.Link>
                    <FaShoppingCart />
                    Cart
                    {cartItems.length > 0 && (
                      <Badge pill bg="success" style={{ marginLeft: "5px" }}>
                        {cartItems.reduce((a, c) => {
                          return (c = a + Number(c.qty));
                        }, 0)}
                      </Badge>
                    )}
                  </Nav.Link>
                </LinkContainer>
                {UserInfo ? (
                  <NavDropdown title={UserInfo.name} id="basic-nav-dropdown">
                    <LinkContainer to="/profile">
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={() => logouthandler()}>
                      LogOut
                    </NavDropdown.Item>
                  </NavDropdown>
                ) : (
                  <LinkContainer to="/login">
                    <Nav.Link>
                      <FaUser />
                      Sign In
                    </Nav.Link>
                  </LinkContainer>
                )}
                {UserInfo && UserInfo.isAdmin && (
                  <NavDropdown title="Admin" id="adminMenu">
                    <LinkContainer to="/admin/productlist">
                      <NavDropdown.Item>Products</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/admin/userlist">
                      <NavDropdown.Item>Users</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/admin/orderlist">
                      <NavDropdown.Item>Oders</NavDropdown.Item>
                    </LinkContainer>
                  </NavDropdown>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
    </>
  );
};

export default Header;
