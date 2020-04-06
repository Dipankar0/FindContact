import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getContact, getAgencies } from '../../actions/findContact';
import { getBranches } from '../../actions/findBranch';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';

const FindContact = ({
  auth: { user },
  setAlert,
  getAgencies,
  getContact,
  getBranches,
  findAgency: { agencies },
  findContact: { contacts },
  findBranch: { branches }
}) => {
  const [agencyId, setAgency] = useState('');
  const [subAgencyId, setSubAgency] = useState('');

  const onChangeAgency = e => {
    setAgency(e.target.value);
    getBranches(e.target.value);
    console.log(e.target.value);
  };

  const onChangeSubAgency = e => {
    e.preventDefault();
    setSubAgency(e.target.value);
  };

  const onSubmit = async e => {
    e.preventDefault();
    console.log(subAgencyId);
    if (subAgencyId === '') {
      setAlert('Please Select Both Agency and Branch', 'danger');
    } else {
      getContact(subAgencyId);
    }
  };

  useEffect(() => {
    getAgencies();
  }, [getAgencies]);

  return (
    <Fragment>
      {user && user.email && (
        <Fragment>
          <h1 className='large text-primary'>Find Contacts of MFI</h1>
          <p className='lead'>
            <i className='fas fa-user'></i> Select Agency
          </p>
          <form className='form' onSubmit={e => onSubmit(e)}>
            <div className='form-group'>
              <Fragment>
                {agencies !== null && agencies.length > 0 ? (
                  <Fragment>
                    <select
                      name='agencyId'
                      onChange={e => {
                        onChangeAgency(e);
                      }}
                    >
                      <option value='0'>Agency</option>
                      {agencies.map(agency => (
                        <option
                          key={agency && agency._id}
                          value={agency && agency._id}
                        >
                          {agency && agency.agencyName}
                        </option>
                      ))}
                    </select>
                    <small className='form-text'>
                      Select one Agency from the list
                    </small>
                  </Fragment>
                ) : (
                  <Fragment>
                    <select>
                      <option value='0'>Agency</option>
                    </select>
                  </Fragment>
                )}
              </Fragment>
            </div>
            <div className='form-group'>
              <Fragment>
                {branches !== null && branches.length > 0 ? (
                  <Fragment>
                    <select
                      name='subAgencyId'
                      onChange={e => {
                        onChangeSubAgency(e);
                      }}
                    >
                      <option value='0'>Select One</option>
                      {branches.map(branch => (
                        <option
                          key={branch && branch._id}
                          value={branch && branch._id}
                        >
                          {branch && branch.branchName}
                        </option>
                      ))}
                    </select>
                    <small className='form-text'>All Branches</small>
                  </Fragment>
                ) : (
                  <div>
                    <select>
                      <option value='0'>Branch</option>
                    </select>
                    <small className='form-text'>
                      Select one Agency to see it's Branches
                    </small>
                  </div>
                )}
              </Fragment>
            </div>
            <input type='submit' className='btn btn-primary' />
          </form>
          <br />
          <div>
            <h1>Contact details:</h1>
            <Fragment>
              {agencies !== null && agencies.length > 0 && (
                <Fragment>
                  {agencies.map(agency => (
                    <Fragment key={agency && agency._id}>
                      {agency && agency._id === agencyId && (
                        <div key={agency && agency._id}>
                          <h1 style={{ color: '#1A5276' }} className='large'>
                            {agency && agency.agencyName}
                          </h1>
                        </div>
                      )}
                    </Fragment>
                  ))}
                </Fragment>
              )}
            </Fragment>
            <Fragment>
              {branches !== null && branches.length > 0 && (
                <Fragment>
                  {branches.map(branch => (
                    <Fragment key={branch && branch._id}>
                      {branch && branch._id === subAgencyId && (
                        <div key={branch && branch._id}>
                          <h2 style={{ color: '#1A5276' }} className='lead'>
                            {branch && branch.branchName}
                          </h2>
                        </div>
                      )}
                    </Fragment>
                  ))}
                </Fragment>
              )}
            </Fragment>
            <Fragment>
              {contacts !== null && contacts.length > 0 && (
                <Fragment>
                  {contacts.map(contact => (
                    <div key={contact && contact._id}>
                      <h3 className='lead' style={{ color: '#117A65' }}>
                        {contact && contact.positionName}
                      </h3>
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
  getAgencies: PropTypes.func.isRequired,
  getContact: PropTypes.func.isRequired,
  getBranches: PropTypes.func.isRequired,
  findAgency: PropTypes.object.isRequired,
  findContact: PropTypes.object.isRequired,
  findBranch: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  alert: state.alert,
  findAgency: state.findAgency,
  findContact: state.findContact,
  findBranch: state.findBranch
});

export default connect(mapStateToProps, {
  setAlert,
  getAgencies,
  getContact,
  getBranches
})(FindContact);
