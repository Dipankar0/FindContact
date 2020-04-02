import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { getContact, getAllContact } from '../../actions/findContact';
import { connect } from 'react-redux';

const FindContact = ({ getContact, findContact: { contact, contacts } }) => {
  const [agency, setAgency] = useState('');

  const onChange = e => setAgency(e.target.value);

  const onSubmit = async e => {
    e.preventDefault();
    console.log(agency);
    getContact(agency);
  };

  return (
    <Fragment>
      <h1 className='large text-primary'>Find Contact</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Select Agency
      </p>
      <form className='form' onSubmit={e => onSubmit(e)}>
        <div className='form-group'>
          <select onChange={e => onChange(e)}>
            <option value='0'>Name Of Agency</option>
            <option value='Agency A'>Agency A</option>
            <option value='Agency B'>Agency B</option>
            <option value='Agency C'>Agency C</option>
          </select>
          <small className='form-text'>All agency names are listed above</small>
        </div>
        <input type='submit' className='btn btn-primary' />
      </form>
      <br />
      <div>
        <h1>Contact details:</h1>
        <h1 style={{ color: '#1A5276' }} className='large'>
          {agency}
        </h1>
        <Fragment>
          {contacts ? (
            <Fragment>
              {contacts.map(contact => (
                <div key={contact && contact.phone}>
                  {contact && contact.name === agency ? (
                    <p className='lead'>
                      <span style={{ color: '#117A65' }}>
                        {contact && contact.positionName} -
                      </span>
                      <span style={{ color: '#34495E' }}>
                        {' '}
                        {contact && contact.phone}
                      </span>
                    </p>
                  ) : (
                    <p></p>
                  )}
                </div>
              ))}
            </Fragment>
          ) : (
            <Fragment></Fragment>
          )}
        </Fragment>
      </div>
    </Fragment>
  );
};

FindContact.propTypes = {
  getContact: PropTypes.func.isRequired,
  getAllContact: PropTypes.func.isRequired,
  findContact: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  findContact: state.findContact
});

export default connect(mapStateToProps, { getContact, getAllContact })(
  FindContact
);
