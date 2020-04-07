import React, { Fragment, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../../layout/Spinner';
import { getCustomers } from '../../../actions/admin';
import CustomerItem from './CustomerItem';

const Customers = ({
  getCustomers,
  admin: { customers, loading },
  auth: { user, isAuthenticated }
}) => {
  useEffect(() => {
    getCustomers();
  }, [getCustomers]);

  return (
    <Fragment>
      {isAuthenticated === false && <Redirect to='/' />}
      <Fragment>
        {user && user.email === 'bhadrad4@gmail.com' && (
          <Fragment>
            {loading ? (
              <Spinner />
            ) : (
              <Fragment>
                <h1 className='large text-primary'>Customers</h1>
                <p className='lead'>
                  <i className='fab fa-connectdevelop' /> New People who want to
                  join
                </p>
                <Fragment>
                  {customers.length > 0 ? (
                    <Fragment>
                      {customers.map(customer => (
                        <CustomerItem key={customer._id} customer={customer} />
                      ))}
                    </Fragment>
                  ) : (
                    <Fragment>
                      <h4>No profiles found to join...</h4>
                    </Fragment>
                  )}
                </Fragment>
              </Fragment>
            )}
            <Link to={'/admin'} className='btn btn-primary'>
              Admin Page
            </Link>
          </Fragment>
        )}
      </Fragment>
    </Fragment>
  );
};

Customers.propTypes = {
  admin: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  getCustomers: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  admin: state.admin
});

export default connect(mapStateToProps, { getCustomers })(Customers);
