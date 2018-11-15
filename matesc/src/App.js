import React, { Component } from 'react';
import './App.css';
import Button from './components/Button';
import { BrowserRouter, Route } from 'react-router-dom';
import { authenticate } from './utils';
import { Alert } from 'reactstrap';

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
  }

  componentDidMount() {
    this.authPromise = authenticate()
      .then(response => response.json())
      .then(data => this.setState({ authentication: data }));
  }

  render() {
    return (
      <AppProvider value={this}>
        <Alert color='primary'>{ JSON.stringify(this.state) }</Alert>
        <BrowserRouter>
            <Route path='/button' component={ Button }/>
        </BrowserRouter>
      </AppProvider>    
    )
  }
}

export default App;
