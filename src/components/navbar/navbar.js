import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  /*UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
DropdownItem*/ } from 'reactstrap';

class Bar extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">BuzzIn</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>

            {this.props.isSignedIn ?
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink href="/components/" onClick={this.props.onSignOut}>Sign Out</NavLink>
                </NavItem>
              </Nav>
              :
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink href="/components/" onClick={this.props.on}>Register</NavLink>
                </NavItem>
              </Nav>
            }
            
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default Bar;
