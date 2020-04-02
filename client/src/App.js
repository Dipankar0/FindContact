import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import './App.css';
import store from './store';

import Alert from './components/layout/Alert';
import FindContact from './components/layout/FindContact';
import AddContact from './components/layout/AddContact';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <section className='container'>
            <Alert />
            <Route exact path='/' component={FindContact} />
            <Route exact path='/addContact' component={AddContact} />
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
