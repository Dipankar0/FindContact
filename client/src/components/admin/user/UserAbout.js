import React from 'react';
import PropTypes from 'prop-types';

const UserAbout = ({ adminUser: { agency, branch, phone, email, name } }) => {
  return (
    <div className='profile-top bg-primary p-2'>
      <div>
        <h1 className='large'>{name}</h1>
      </div>
      <p className='lead'>
        <span>Agency:</span> <span>{agency}</span>
      </p>
      <p className='lead'>
        <span>Branch:</span> <span>{branch}</span>
      </p>
      <p className='lead'>
        <span>Email:</span> <span>{email}</span>
      </p>
      <p className='lead'>
        <span>Mobile Number:</span> <span>{phone}</span>
      </p>
    </div>
  );
};

UserAbout.propTypes = {
  adminUser: PropTypes.object.isRequired
};

export default UserAbout;
