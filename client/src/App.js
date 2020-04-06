import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import './App.css';
import store from './store';

import Navbar from './components/layout/Navbar';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alert from './components/layout/Alert';
import FindContact from './components/MFIContacts/FindContact';
import AddContact from './components/MFIContacts/AddContact';
import AddMRAContact from './components/MRAContacts/AddContact';
import MRAFindContact from './components/MRAContacts/FindContact';

import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import Customers from './components/admin/customer/Customers';
import Customer from './components/admin/customer/Customer';
import Users from './components/admin/user/Users';
import User from './components/admin/user/User';
import Admin from './components/admin/Admin';
import MainPage from './components/layout/MainPage';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <section className='container'>
            <Alert />
            <Switch>
              <Route exact path='/' component={MainPage} />
              <Route exact path='/admin' component={Admin} />
              <Route exact path='/customers' component={Customers} />
              <Route exact path='/customer/:id' component={Customer} />
              <Route exact path='/users' component={Users} />
              <Route exact path='/user/:id' component={User} />
              <Route exact path='/register' component={Register} />
              <Route exact path='/login' component={Login} />
              <Route exact path='/MFIContacts' component={FindContact} />
              <Route exact path='/MRAContacts' component={MRAFindContact} />
              <Route exact path='/addMFIContact' component={AddContact} />
              <Route exact path='/addMRAContact' component={AddMRAContact} />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
