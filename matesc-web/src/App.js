import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Login from './Login'
import UnprocessedOrders from './components/UnprocessedOrders';
import ClientOrderContent from './components/ClientOrderContent';
import PickingList from './components/PickingList';
import Warehouse from './components/Warehouse';
import SupplierOrders from './components/SupplierOrders';
import ReplenishmentList from './components/ReplenishmentList';
import SupplierOrderContent from './components/SupplierOrderContent';
import ProductsToStore from './components/ProductsToStore';
import { Redirect, BrowserRouter, Link } from 'react-router-dom';

const AppContext = React.createContext();
export const AppProvider = AppContext.Provider;
export const AppConsumer = AppContext.Consumer;

class App extends Component {

  render() {
    return (
      <AppProvider value={this}>
        <BrowserRouter>
          <React.Fragment>
            <Route path='/login' component={Login} />
            <Route path='/unprocessed-client-orders' component={UnprocessedOrders} />
            <Route path='/unprocessed-supplier-orders' component={SupplierOrders} />
            <Route path='/client-order-content' component={ClientOrderContent} />
            <Route path='/supplier-order-content' component={SupplierOrderContent} />
            <Route path='/picking-list' component={PickingList} />
            <Route path='/warehouse' component={Warehouse} />
            <Route path='/replenishment-list' component={ReplenishmentList} />
            <Route path='/produts-to-store' component={ProductsToStore} />
          </React.Fragment>
        </BrowserRouter>
      </AppProvider>
    );
  }
}

export default App;

