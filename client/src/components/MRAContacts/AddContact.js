import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addContact } from '../../actions/findMRAContact';

const AddContact = ({ addContact, auth: { user } }) => {
  const [formData, setFormData] = useState({
    positionName: '',
    phone: '',
    name: '',
    email: ''
  });

  const { positionName, phone, name, email } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    console.log(formData);
    addContact(formData);
  };

  return (
    <Fragment>
      {user && user.email === 'bhadrad4@gmail.com' && (
        <Fragment>
          <h1 className='large text-primary'>Add New Contact For MRA</h1>
          <p className='lead'>
            <i className='fas fa-user' /> Contact Details for each person
          </p>
          <small>* = required field</small>
          <form className='form' onSubmit={e => onSubmit(e)}>
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
            <Link className='btn btn-light my-1' to='/MRAContacts'>
              Find Contact
            </Link>
          </form>
        </Fragment>
      )}
    </Fragment>
  );
};

AddContact.propTypes = {
  auth: PropTypes.object.isRequired,
  addContact: PropTypes.func.isRequired,
  findMRAContact: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  findMRAContact: state.findContact
});

export default connect(mapStateToProps, { addContact })(AddContact);
