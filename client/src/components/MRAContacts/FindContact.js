import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getContacts, getDesignations } from '../../actions/findMRAContact';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';

const FindContact = ({
  setAlert,
  getDesignations,
  getContacts,
  findMRAContact: { contact, contacts, designations },
  auth: { user }
}) => {
  const [designationId, setDesignationId] = useState('');

  const onChange = e => {
    console.log(e.target.value);
    setDesignationId(e.target.value);
  };

  const onSubmit = async e => {
    e.preventDefault();
    console.log(designationId);
    if (designationId === '') {
      setAlert('Please Select Designation', 'danger');
    } else {
      getContacts(designationId);
    }
  };

  useEffect(() => {
    getDesignations();
  }, [getDesignations]);

  return (
    <Fragment>
      {user && user.email && (
        <Fragment>
          <h1 className='large text-primary'>MRA Contacts</h1>
          <p className='lead'>
            <i className='fas fa-user'></i> Select Designation
          </p>
          <form className='form' onSubmit={e => onSubmit(e)}>
            <div className='form-group'>
              <Fragment>
                {designations !== null && designations.length > 0 ? (
                  <Fragment>
                    <select
                      name='designationId'
                      onChange={e => {
                        onChange(e);
                      }}
                    >
                      <option value='0'>Designation</option>
                      {designations.map(designation => (
                        <option
                          key={designation && designation._id}
                          value={designation && designation._id}
                        >
                          {designation && designation.positionName}
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
              {designations !== null && designations.length > 0 && (
                <Fragment>
                  {designations.map(designation => (
                    <Fragment key={designation && designation._id}>
                      {designation && designation._id === designationId && (
                        <div key={designation && designation._id}>
                          <h1 style={{ color: '#1A5276' }} className='large'>
                            {designation && designation.positionName}
                          </h1>
                        </div>
                      )}
                    </Fragment>
                  ))}
                </Fragment>
              )}
            </Fragment>
            <Fragment>
              {contacts.length > 0 && (
                <Fragment>
                  {contacts.map(contact => (
                    <Fragment key={contact._id}>
                      {contact && contact.positionId === designationId && (
                        <div key={contact && contact._id}>
                          <p className='lead'>
                            <i className='fas fa-user'></i> <span>Name - </span>
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
                      )}
                    </Fragment>
                  ))}
                </Fragment>
              )}
            </Fragment>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

FindContact.propTypes = {
  auth: PropTypes.object.isRequired,
  setAlert: PropTypes.func.isRequired,
  getDesignations: PropTypes.func.isRequired,
  getContacts: PropTypes.func.isRequired,
  findMRAContact: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  alert: state.alert,
  findMRAContact: state.findMRAContact
});

export default connect(mapStateToProps, {
  setAlert,
  getDesignations,
  getContacts
})(FindContact);
