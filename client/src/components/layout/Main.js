import React, { Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import logo from './fc_logo.jpg';

const Main = ({ auth: { user, isAuthenticated } }) => {
  return (
    <Fragment>
      {isAuthenticated === false && <Redirect to='/' />}
      <Fragment>
        {user && user.permission === 'approve' ? (
          <Fragment>
            {user && user.email && (
              <Fragment>
                <div className='badge'>
                  <img
                    src={logo}
                    style={{
                      width: '400px',
                      height: 'auto',
                      margin: 'auto',
                      display: 'block'
                    }}
                    alt='Loading...'
                  />
                </div>
                <br />
                <div className='profile-about'>
                  <Link to={'/MRAContacts'} className='btn btn-primary'>
                    MRA Contact
                  </Link>{' '}
                  <Link to={'/MFIContacts'} className='btn btn-primary'>
                    MFI Contact
                  </Link>
                </div>
              </Fragment>
            )}
          </Fragment>
        ) : (
          <Fragment>
            {user && user.permission === 'request' ? (
              <Fragment>
                <h1>
                  Your application of using this application service is under
                  review by Admin.
                </h1>
                <p>Plese login again later to check status</p>
              </Fragment>
            ) : (
              <Fragment>
                <h1>Your application was Rejected by Admin.</h1>
                <p>Plese contact with the authority</p>
              </Fragment>
            )}
          </Fragment>
        )}
      </Fragment>
    </Fragment>
  );
};

Main.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Main);
