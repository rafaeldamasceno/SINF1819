import React, { Component } from 'react';
import './App.css';
import { Link } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';

export default class NavBar extends Component {
  constructor(props) {
    super(props);
   
    this.state = {
      items: {}
    };

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
 
  render() {
    return (
        <React.Fragment>
          <Navbar color='dark' dark fixed='top' expand='md'>
            <NavbarBrand className='text-white'>MATESC</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="mr-auto" navbar>
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    Sales
                  </DropdownToggle>
                  <DropdownMenu left>
                    <Link to='/unprocessed-client-orders'>
                      <DropdownItem>
                      Unprocessed client orders
                      </DropdownItem>
                    </Link>
                  </DropdownMenu>
                </UncontrolledDropdown>
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    Purchases
                  </DropdownToggle>
                  <DropdownMenu left>
                    <Link to='/unprocessed-supplier-orders'>
                      <DropdownItem>
                      Unprocessed supplier orders
                      </DropdownItem>
                    </Link>
                    <Link to='/products-to-store'>
                      <DropdownItem>
                      Products to store
                      </DropdownItem>
                    </Link>
                  </DropdownMenu>
                </UncontrolledDropdown>
                <NavItem>
                  <Link to='/warehouse'><NavLink>Warehouse</NavLink></Link>
                </NavItem>
                <NavItem>
                  <Link to='/unfinished-lists'><NavLink>Unfinished lists</NavLink></Link>
                </NavItem>
              </Nav>
            </Collapse>
          </Navbar>
        </React.Fragment>
    );
  }
}
