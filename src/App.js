import React, { Component } from 'react';
import './App.css';
import './flexbox.css';

import { Provider } from 'mobx-react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { AppBar } from 'material-ui';

import Store from './lib/Store';
import DataViewer from './components/DataViewer';

const store = new Store();

class App extends Component {
  componentWillMount() {
    // load the data from the server into the store
    store.loadData();
  }
  render() {
    return (
      <Provider store={store}>
        <MuiThemeProvider>
          <div className="App vertical layout">
            <AppBar
              className="AppHead"
              title="react-chart-demo"
              showMenuIconButton={false}
            >
            </AppBar>
            <div className="AppBody flex vertical layout">
              <DataViewer className="flex"
              ></DataViewer>
            </div>
          </div>
        </MuiThemeProvider>
      </Provider>
    );
  }
}

export default App;
