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
                    <Link to='/unprocessed-orders'><NavLink>Unprocessed orders</NavLink></Link>
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
            <Route path='/unprocessed-orders' component={UnprocessedOrders} />
            <Route path='/order-content' component={OrderContent} />
          </React.Fragment>
        </BrowserRouter>
      </AppProvider>
    );
  }
}

export default App;
