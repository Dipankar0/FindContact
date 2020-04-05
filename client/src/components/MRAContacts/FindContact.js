import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getContact, getOneContact } from '../../actions/findMRAContact';
import { connect } from 'react-redux';

const FindContact = ({
  getOneContact,
  getContact,
  findMRAContact: { contact, contacts }
}) => {
  const [contactId, setContactId] = useState('');

  const onChange = e => {
    console.log(e.target.value);
    setContactId(e.target.value);
  };

  const onSubmit = async e => {
    e.preventDefault();
    console.log(contactId);
    getOneContact(contactId);
  };

  useEffect(() => {
    getContact();
  }, [getContact]);

  return (
    <Fragment>
      <h1 className='large text-primary'>MRA Contacts</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Select Designation
      </p>
      <form className='form' onSubmit={e => onSubmit(e)}>
        <div className='form-group'>
          <Fragment>
            {contacts !== null && contacts.length > 0 ? (
              <Fragment>
                <select
                  name='contactId'
                  onChange={e => {
                    onChange(e);
                  }}
                >
                  <option value='0'>Designation</option>
                  {contacts.map(contact => (
                    <option
                      key={contact && contact._id}
                      value={contact && contact._id}
                    >
                      {contact && contact.positionName}
                    </option>
                  ))}
                </select>
                <small className='form-text'>
                  Select one Designation from the list
                </small>
              </Fragment>
            ) : (
              <Fragment>
                <select>
                  <option value='0'>Designation</option>
                </select>
              </Fragment>
            )}
          </Fragment>
        </div>
        <input type='submit' className='btn btn-primary' />
      </form>
      <br />
      <div>
        <h1>Contact details:</h1>
        <Fragment>
          {contact && (
            <Fragment>
              <div key={contact && contact._id}>
                <h3 className='lead' style={{ color: '#117A65' }}>
                  {contact && contact.positionName}
                </h3>
                <p className='lead'>
                  <span>Name - </span>
                  <span style={{ color: '#34495E' }}>
                    {contact && contact.name}
                  </span>
                </p>
                <p className='lead'>
                  <span>Mobile No - </span>
                  <span style={{ color: '#34495E' }}>
                    {contact && contact.phone}
                  </span>
                </p>
                <p className='lead'>
                  <span>Email - </span>
                  <span style={{ color: '#34495E' }}>
                    {contact && contact.email}
                  </span>
                </p>
              </div>
            </Fragment>
          )}
        </Fragment>
      </div>
    </Fragment>
  );
};

FindContact.propTypes = {
  getOneContact: PropTypes.func.isRequired,
  getContact: PropTypes.func.isRequired,
  findMRAContact: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  findMRAContact: state.findMRAContact
});

export default connect(mapStateToProps, {
  getOneContact,
  getContact
})(FindContact);
