import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../../layout/Spinner';
import { getUsers } from '../../../actions/admin';
import UserItem from './UserItem';

const Users = ({
  getUsers,
  admin: { adminUsers, loading },
  auth: { user }
}) => {
  useEffect(() => {
    getUsers();
  }, [getUsers]);

  return (
    <Fragment>
      {user && user.email === 'bhadrad4@gmail.com' && (
        <Fragment>
          {loading ? (
            <Spinner />
          ) : (
            <Fragment>
              <h1 className='large text-primary'>Users</h1>
              <p className='lead'>
                <i className='fab fa-connectdevelop' /> New Users who have
                joined
              </p>
              <Fragment>
                {adminUsers.length > 0 ? (
                  <Fragment>
                    {adminUsers.map(adminUser => (
                      <UserItem key={adminUser._id} adminUser={adminUser} />
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
  );
};

Users.propTypes = {
  admin: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  getUsers: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  admin: state.admin
});

export default connect(mapStateToProps, { getUsers })(Users);
