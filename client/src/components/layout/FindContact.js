import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getContact, getAgencies } from '../../actions/findContact';
import { getBranches } from '../../actions/findBranch';
import { connect } from 'react-redux';

const FindContact = ({
  getAgencies,
  getContact,
  getBranches,
  findAgency: { agencies },
  findContact: { contacts },
  findBranch: { branches }
}) => {
  const [agency, setAgency] = useState('');
  const [subAgency, setSubAgency] = useState('');

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
    console.log(subAgency);
    getContact(subAgency);
  };

  useEffect(() => {
    getAgencies();
  }, [getAgencies]);

  return (
    <Fragment>
      <h1 className='large text-primary'>Find Contact</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Select Agency
      </p>
      <form className='form' onSubmit={e => onSubmit(e)}>
        <div className='form-group'>
          <Fragment>
            {agencies !== null && agencies.length > 0 ? (
              <Fragment>
                <select
                  onChange={e => {
                    onChangeAgency(e);
                  }}
                >
                  <option value='0'>Agency</option>
                  {agencies.map(agency => (
                    <option
                      key={agency && agency._id}
                      value={agency && agency.agencyName}
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
                  onChange={e => {
                    onChangeSubAgency(e);
                  }}
                >
                  <option value='0'>Select One</option>
                  {branches.map(branch => (
                    <option
                      key={branch && branch._id}
                      value={branch && branch.branchName}
                    >
                      {branch && branch.branchName}
                    </option>
                  ))}
                </select>
                <small className='form-text'>All Branches under {agency}</small>
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
        <h1 style={{ color: '#1A5276' }} className='large'>
          {agency}
        </h1>
        <Fragment>
          {contacts !== null && contacts.length > 0 && (
            <Fragment>
              {contacts.map(contact => (
                <div key={contact && contact._id}>
                  <p className='lead'>
                    <span style={{ color: '#117A65' }}>
                      {contact && contact.positionName} -
                    </span>
                    <span style={{ color: '#34495E' }}>
                      {' '}
                      {contact && contact.phone}
                    </span>
                  </p>
                </div>
              ))}
            </Fragment>
          )}
        </Fragment>
      </div>
    </Fragment>
  );
};

FindContact.propTypes = {
  getAgencies: PropTypes.func.isRequired,
  getContact: PropTypes.func.isRequired,
  getBranches: PropTypes.func.isRequired,
  findAgency: PropTypes.object.isRequired,
  findContact: PropTypes.object.isRequired,
  findBranch: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  findAgency: state.findAgency,
  findContact: state.findContact,
  findBranch: state.findBranch
});

export default connect(mapStateToProps, {
  getAgencies,
  getContact,
  getBranches
})(FindContact);
