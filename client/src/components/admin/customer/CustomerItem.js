import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const CustomerItem = ({ customer: { _id, name, email, phone } }) => {
  return (
    <div className='profile bg-light'>
      <div>
        <h2>{name}</h2>
        <p>{email}</p>
        <p className='my-1'>{phone}</p>
        <Link to={`/customer/${_id}`} className='btn btn-primary'>
          View User
        </Link>
      </div>
    </div>
  );
};

CustomerItem.propTypes = {
  customer: PropTypes.object.isRequired
};

export default CustomerItem;
