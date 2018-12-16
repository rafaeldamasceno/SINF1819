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
import Button from './components/Button';



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
              <Route path='/unprocessed-client-orders' render={() => <UnprocessedOrders />} />
              <Route path='/unprocessed-supplier-orders' render={() => <SupplierOrders authentication={this.state.authentication} />} />
              <Route path='/client-order-content' render={() => <ClientOrderContent authentication={this.state.authentication} />} />
              <Route path='/supplier-order-content' render={() => <SupplierOrderContent authentication={this.state.authentication} />} />
              <Route path='/picking-list' render={() => <PickingList authentication={this.state.authentication} />} />
              <Route path='/warehouse' render={() => <Warehouse authentication={this.state.authentication} />} />
              <Route path='/replenishment-list' render={() => <ReplenishmentList authentication={this.state.authentication} />} />
              <Route path='/button' render={Button} />
              <Route path='/produts-to-store' render={() => <ProductsToStore authentication={this.state.authentication} />} />
          </React.Fragment>
        </BrowserRouter>
      </AppProvider>
    );
  }
}

export default App;

