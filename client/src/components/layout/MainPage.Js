import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import logo from './fc_logo.jpg';

const MainPage = ({ auth: { user } }) => {
  return (
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
  );
};

MainPage.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(MainPage);
