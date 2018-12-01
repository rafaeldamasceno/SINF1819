import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import { authenticate } from './utils';
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
import OrderContent from './components/OrderContent';
import PickingList from './components/PickingList';
import Warehouse from './components/Warehouse';
import SupplierOrder from './components/SupplierOrder';
import ReplenishmentList from './components/ReplenishmentList';

const AppContext = React.createContext();
export const AppProvider = AppContext.Provider;
export const AppConsumer = AppContext.Consumer;

class App extends Component {
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
      .then(data => this.setState({ authentication: data }));
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
                  <NavItem>
                    <Link to='/items'><NavLink>Items</NavLink></Link>
                  </NavItem>
                  <NavItem>
                    <Link to='/clients'><NavLink>Clients</NavLink></Link>
                  </NavItem>
                </Nav>
              </Collapse>
            </Navbar>
            {/* <Alert color='primary'>{JSON.stringify(this.state)}</Alert>
        <Button color='primary' onClick={() => { query(this.state.authentication, 'test') }}>
          test query
        </Button> */}
            <Route path='/unprocessed-client-orders' component={UnprocessedOrders} />
            <Route path='/unprocessed-supplier-orders' component={SupplierOrder} />
            <Route path='/order-content' component={OrderContent} />
            <Route path='/picking-list' component={PickingList} />
            <Route path='/warehouse' component={Warehouse} />
            <Route path='/replenishment-list' component={ReplenishmentList}/>
          </React.Fragment>
        </BrowserRouter>
      </AppProvider>
    );
  }
}

export default App;
