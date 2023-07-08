import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  NavLink,
  Nav,
  NavItem,
  NavbarText,
} from 'reactstrap';

export default function NavBar() {
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
              href="/customer/products"
              data-testid="customer_products__element-navbar-link-products"
            >
              Produtos
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className="text-dark"
              href="/customer/orders"
              data-testid="customer_products__element-navbar-link-orders"
            >
              Meus Pedidos
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
