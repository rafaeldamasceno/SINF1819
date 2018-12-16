import React, { Component } from 'react';
import { Route , Switch} from 'react-router-dom';
import Login from './Login'
import UnprocessedOrders from './components/UnprocessedOrders';
import ClientOrderContent from './components/ClientOrderContent';
import PickingList from './components/PickingList';
import Warehouse from './components/Warehouse';
import SupplierOrders from './components/SupplierOrders';
import ReplenishmentList from './components/ReplenishmentList';
import SupplierOrderContent from './components/SupplierOrderContent';
import ProductsToStore from './components/ProductsToStore';
import { Redirect, BrowserRouter} from 'react-router-dom';
import Cookies from 'universal-cookie';
import UnfinishedLists from './components/UnfinishedLists';

const AppContext = React.createContext();
export const AppProvider = AppContext.Provider;
export const AppConsumer = AppContext.Consumer;

class App extends Component {

  constructor(props){
    super(props);
    const cookies = new Cookies();
    if(!cookies.get('token') && !window.location.href.endsWith('login')){
      window.location.href = '/login';
    }
  }

  showRedirect(){
    const cookies = new Cookies();
    if(!cookies.get('token')){
      return <Redirect exact from='/' to='/login' />
    } else{
      return <Redirect exact from ='/' to= '/unprocessed-client-orders'/>
    }
  }

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
            <Route path='/unfinished-lists' component={UnfinishedLists} />
            <Switch>
              {this.showRedirect()}
            </Switch>
          </React.Fragment>
        </BrowserRouter>
      </AppProvider>
    );
  }
}

export default App;

