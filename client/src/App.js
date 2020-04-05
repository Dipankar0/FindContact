import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import './App.css';
import store from './store';

import Alert from './components/layout/Alert';
import FindContact from './components/MFIContacts/FindContact';
import AddContact from './components/MFIContacts/AddContact';
import AddMRAContact from './components/MRAContacts/AddContact';
import MRAFindContact from './components/MRAContacts/FindContact';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <section className='container'>
            <Alert />
            <Route exact path='/MFIContacts' component={FindContact} />
            <Route exact path='/MRAContacts' component={MRAFindContact} />
            <Route exact path='/addMFIContact' component={AddContact} />
            <Route exact path='/addMRAContact' component={AddMRAContact} />
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
