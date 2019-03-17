import React from 'react';
import { NavLink as NavLinkRR } from 'react-router-dom';

import * as ROUTES from '../../constants/routes';
import SignOutButton from '../SignOut';

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';

class Navigation extends React.Component {
  constructor(props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true,
    };
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }
  render() {
    return (
      <div>
        <Navbar color="faded" light>
          <NavbarBrand href="/" className="mr-auto">
            Alas Kasih
          </NavbarBrand>
          <NavbarToggler
            onClick={this.toggleNavbar}
            className="mr-2"
          />
          <Collapse isOpen={!this.state.collapsed} navbar>
            <Nav navbar>
              <NavItem>
                <NavLink tag={NavLinkRR} to={ROUTES.SIGN_IN}>
                  Sign in
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={NavLinkRR} to={ROUTES.LANDING}>
                  Landing Page
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={NavLinkRR} to={ROUTES.HOME}>
                  Home
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={NavLinkRR} to={ROUTES.ACCOUNT}>
                  Account
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={NavLinkRR} to={ROUTES.ADMIN}>
                  Admin
                </NavLink>
              </NavItem>
              <NavItem>
                <SignOutButton />
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default Navigation;
