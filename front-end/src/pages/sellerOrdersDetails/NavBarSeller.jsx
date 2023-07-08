import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  NavLink,
  Nav,
  NavItem,
  NavbarText,
} from 'reactstrap';

export default function NavBarSeller() {
  const userJson = localStorage.getItem('user');
  const user = JSON.parse(userJson);

  const redirect = useNavigate();
  const handleLogOut = () => {
    localStorage.removeItem('user');
    redirect('/login');
  };
  return (
    <header className="navi">
      <Nav className="navbar navbar-expand-lg bg-success">
        <div className="container-fluid">
          <NavItem>
            <NavLink
              className="text-dark"
              href="/seller/orders"
              data-testid="customer_products__element-navbar-link-orders"
            >
              Pedidos
            </NavLink>
          </NavItem>
          <NavbarText
            data-testid="customer_products__element-navbar-user-full-name"
          >
            { user.name }
          </NavbarText>
          <NavItem>
            <NavLink
              className="text-dark"
              href="/"
              data-testid="customer_products__element-navbar-link-logout"
              onClick={ handleLogOut }
            >
              Sair
            </NavLink>
          </NavItem>
        </div>
      </Nav>
    </header>
  );
}
