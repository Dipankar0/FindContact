import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Admin = ({ auth: { user } }) => {
  const email = user && user.email;
  return (
    <Fragment>
      {user && user.email === 'bhadrad4@gmail.com' && (
        <Fragment>
          <h1 className='large text-primary'>Dashboard</h1>
          <p className='lead'>
            <i className='fas fa-user'></i> Welcome Mr. Admin
          </p>

          <div className='my-2'>
            <Link to={`/customers`} className='btn btn-primary'>
              Pending Requests
            </Link>
          </div>
          <div className='my-2'>
            <Link to={`/users`} className='btn btn-primary'>
              Approved Users
            </Link>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Admin.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Admin);
