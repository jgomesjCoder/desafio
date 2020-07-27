import React, { useState, useEffect } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Button,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import { useHistory } from "react-router";

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isAuthenticated = !!localStorage.getItem('app-token');
  const [visivel, setVisivel] = useState(isAuthenticated);
  const toggle = () => setIsOpen(!isOpen);

  let history = useHistory();

  useEffect(() => {
    if (isAuthenticated) {
      setVisivel(true)
    }
  }, [isAuthenticated, visivel]);

  function handleLogout() {
    localStorage.removeItem('app-token');
    history.push("/login");
  }
  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">Desafio</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="/">Home</NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Clientes
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  <NavLink href="/clients">Listar</NavLink>
                </DropdownItem>
                <DropdownItem>
                <NavLink href="/client">Cadastrar</NavLink>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>

          </Nav>
        </Collapse>
        {visivel ?
          <Button color="link" type="submit" onClick={() => handleLogout()} >Logout</Button> : null
        }
      </Navbar>
    </div>
  );
}

export default Menu;

//