import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Link } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
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
                <NavItem>
                  <Link to='/unprocessed-client-orders'><NavLink>Unprocessed client orders</NavLink></Link>
                </NavItem>
                <NavItem>
                  <Link to='/unprocessed-supplier-orders'><NavLink>Unprocessed supplier orders</NavLink></Link>
                </NavItem>
                <NavItem>
                  <Link to='/warehouse'><NavLink>Warehouse</NavLink></Link>
                </NavItem>
              </Nav>
            </Collapse>
          </Navbar>
        </React.Fragment>
    );
  }
}
