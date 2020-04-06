import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import spinner from './spinner.gif';

export default () => (
  <Fragment>
    <img
      src={spinner}
      style={{ width: '200px', margin: 'auto', display: 'block' }}
      alt='Loading...'
    />
    <Link to='/'>Home Page</Link>
  </Fragment>
);
