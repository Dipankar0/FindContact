import React, { Fragment, useEffect, useState } from 'react';
import { Link, withRouter, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addContact } from '../../actions/findContact';

const AddContact = ({ addContact, auth: { user, isAuthenticated } }) => {
  const [formData, setFormData] = useState({
    agency: '',
    branch: '',
    positionName: '',
    phone: '',
    name: '',
    email: ''
  });

  const { agency, branch, positionName, phone, name, email } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    console.log(formData);
    addContact(formData);
  };

  return (
    <Fragment>
      {isAuthenticated === false && <Redirect to='/' />}
      <Fragment>
        {user && user.permission === 'approve' ? (
          <Fragment>
            {user && user.email === 'bhadrad4@gmail.com' && (
              <Fragment>
                <h1 className='large text-primary'>Add New Contact</h1>
                <p className='lead'>
                  <i className='fas fa-user' /> Contact Details for each person
                </p>
                <small>* = required field</small>
                <form className='form' onSubmit={e => onSubmit(e)}>
                  <div className='form-group'>
                    <input
                      type='text'
                      placeholder='* Agency Name'
                      name='agency'
                      value={agency}
                      onChange={e => onChange(e)}
                    />
                    <small className='form-text'>The Name Of Main Agency</small>
                  </div>
                  <div className='form-group'>
                    <input
                      type='text'
                      placeholder='* Branch Name'
                      name='branch'
                      value={branch}
                      onChange={e => onChange(e)}
                    />
                    <small className='form-text'>
                      The Branch Under {agency}
                    </small>
                  </div>
                  <div className='form-group'>
                    <input
                      type='text'
                      placeholder='* Position'
                      name='positionName'
                      value={positionName}
                      onChange={e => onChange(e)}
                    />
                    <small className='form-text'>Position Of That Person</small>
                  </div>
                  <div className='form-group'>
                    <input
                      type='text'
                      placeholder='Name'
                      name='name'
                      value={name}
                      onChange={e => onChange(e)}
                    />
                    <small className='form-text'>Name Of That Person</small>
                  </div>
                  <div className='form-group'>
                    <input
                      type='text'
                      placeholder='* Mobile Number'
                      name='phone'
                      value={phone}
                      onChange={e => onChange(e)}
                    />
                    <small className='form-text'>Official Mobile Number</small>
                  </div>
                  <div className='form-group'>
                    <input
                      type='text'
                      placeholder='Email'
                      name='email'
                      value={email}
                      onChange={e => onChange(e)}
                    />
                    <small className='form-text'>Official Email Address</small>
                  </div>
                  <input type='submit' className='btn btn-primary my-1' />
                  <Link className='btn btn-light my-1' to='/'>
                    Find Contact
                  </Link>
                </form>
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

AddContact.propTypes = {
  auth: PropTypes.object.isRequired,
  addContact: PropTypes.func.isRequired,
  findContact: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  findContact: state.findContact
});

export default connect(mapStateToProps, { addContact })(AddContact);
