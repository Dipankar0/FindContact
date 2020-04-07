import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../../layout/Spinner';
import UserAbout from './UserAbout';
import { getUserById } from '../../../actions/admin';

const User = ({
  auth: { user, isAuthenticated },
  getUserById,
  admin: { adminUser, loading },
  match
}) => {
  useEffect(() => {
    getUserById(match.params.id);
  }, [getUserById, match.params.id]);

  return (
    <Fragment>
      {isAuthenticated === false && <Redirect to='/' />}
      <Fragment>
        {user && user.email === 'bhadrad4@gmail.com' && (
          <Fragment>
            {adminUser === null || loading ? (
              <Spinner />
            ) : (
              <Fragment>
                <div className='profile-grid my-1'>
                  <UserAbout adminUser={adminUser} />
                </div>{' '}
              </Fragment>
            )}
            <Link to='/users' className='btn btn-light'>
              Back To Users
            </Link>
          </Fragment>
        )}
      </Fragment>
    </Fragment>
  );
};

User.propTypes = {
  getUserById: PropTypes.func.isRequired,
  admin: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  admin: state.admin,
  auth: state.auth
});

export default connect(mapStateToProps, {
  getUserById
})(User);
