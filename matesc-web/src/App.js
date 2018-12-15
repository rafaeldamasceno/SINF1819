import React, { Component } from 'react';
import Button from './components/Button';
import { Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import Login from './Login'
import { Redirect, BrowserRouter, Link } from 'react-router-dom';
import PickingList from './components/PickingList';
import { Badge } from 'reactstrap';

const AppContext = React.createContext();
export const AppProvider = AppContext.Provider;
export const AppConsumer = AppContext.Consumer;

class App extends Component {
 
  render() {
    return (
      <AppProvider value={this}>
        <BrowserRouter>
          <React.Fragment>
            <Route path='/dashboard' component = {Dashboard} />
            <Route path='/login' component = {Login} />
          </React.Fragment>
        </BrowserRouter>
      </AppProvider>
    );
  }
}

export default App;

