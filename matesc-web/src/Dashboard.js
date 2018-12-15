import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import { authenticate } from './utils';
import Cookies from 'universal-cookie';
import {
  Collapse,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import UnprocessedOrders from './components/UnprocessedOrders';
import ClientOrderContent from './components/ClientOrderContent';
import PickingList from './components/PickingList';
import Warehouse from './components/Warehouse';
import SupplierOrders from './components/SupplierOrders';
import ReplenishmentList from './components/ReplenishmentList';
import SupplierOrderContent from './components/SupplierOrderContent';
import ProductsToStore from './components/ProductsToStore';
import Button from './components/Button';

const AppContext = React.createContext();
export const AppProvider = AppContext.Provider;
export const AppConsumer = AppContext.Consumer;

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authentication: {},
      items: {}
    };

    this.authPromise = null;

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
 
  componentDidMount() {
    this.authPromise = authenticate()
      .then(response => response.json())
      .then(data => {
        this.setState({ authentication: data });
    });
  }

  render() {
    return (
      <AppProvider value={this}>
      <BrowserRouter>
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
          {/* <Alert color='primary'>{JSON.stringify(this.state)}</Alert>
        <Button color='primary' onClick={() => { query(this.state.authentication, 'test') }}>
          test query
        </Button> */}
  
            <Route path='/unprocessed-client-orders' render={() => <UnprocessedOrders authentication={this.state.authentication}/>} />
            <Route path='/unprocessed-supplier-orders' render={() => <SupplierOrders authentication={this.state.authentication}/>} />
            <Route path='/client-order-content' render={ () => <ClientOrderContent authentication={this.state.authentication} />} />
            <Route path='/supplier-order-content' render={() => <SupplierOrderContent authentication={this.state.authentication} />} />
            <Route path='/picking-list' render={() => <PickingList authentication={this.state.authentication} />} />
            <Route path='/warehouse' render={() => <Warehouse authentication={this.state.authentication}/>} />
            <Route path='/replenishment-list' render={() => <ReplenishmentList authentication={this.state.authentication}/>} />
            <Route path='/button' render={Button} />
            <Route path='/produts-to-store' render={() => <ProductsToStore authentication={this.state.authentication}/>} />
        </React.Fragment>
      </BrowserRouter>
      </AppProvider>
    );
  }
}

export default Dashboard;
