import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../../layout/Spinner';
import CustomerAbout from './CustomerAbout';
import {
  approveCustomer,
  rejectCustomer,
  getCustomerById
} from '../../../actions/admin';

const Customer = ({
  auth: { user, isAuthenticated },
  approveCustomer,
  rejectCustomer,
  getCustomerById,
  admin: { customer, loading },
  match,
  history
}) => {
  const onApprove = e => {
    e.preventDefault();
    approveCustomer(match.params.id, history);
  };

  const onReject = e => {
    e.preventDefault();
    rejectCustomer(match.params.id, history);
  };

  useEffect(() => {
    getCustomerById(match.params.id);
  }, [getCustomerById, match.params.id]);

  return (
    <Fragment>
      {isAuthenticated === false && <Redirect to='/' />}
      <Fragment>
        {user && user.email === 'bhadrad4@gmail.com' && (
          <Fragment>
            {customer === null || loading ? (
              <Spinner />
            ) : (
              <Fragment>
                <div className='profile-grid my-1'>
                  <CustomerAbout customer={customer} />
                </div>{' '}
                <button className='btn btn-primary' onClick={e => onApprove(e)}>
                  Approve
                </button>
                <button className='btn btn-danger' onClick={e => onReject(e)}>
                  Reject
                </button>
              </Fragment>
            )}
            <Link to='/customers' className='btn btn-light'>
              Back To Customers
            </Link>
          </Fragment>
        )}
      </Fragment>
    </Fragment>
  );
};

Customer.propTypes = {
  approveCustomer: PropTypes.func.isRequired,
  rejectCustomer: PropTypes.func.isRequired,
  getCustomerById: PropTypes.func.isRequired,
  customer: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  admin: state.admin,
  auth: state.auth
});

export default connect(mapStateToProps, {
  approveCustomer,
  rejectCustomer,
  getCustomerById
})(Customer);
