import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Profile extends Component {
  render() {
    const { first_name, last_name, email, avatar, id } = this.props.profile;
    return (
      <div className="card card-body bg-light mb-3">
        <div className="row">
          <div className="col-2">
            <img src={avatar} alt='' className="rounded-circle" />
          </div>
          <div className="col-lg-6 col-md-4">
            <div style={{ marginTop: '40px' }}>
              <h3>{`${first_name} ${last_name}`}</h3>
              <h5>Person #{id}</h5>
            </div>
          </div>
          <div className="col-md-4 d-none d-md-block">
            <div style={{ marginTop: '40px' }}>
              <h4>Email: {email} </h4>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  profile: PropTypes.object.isRequired,
}

export default Profile;