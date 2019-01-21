import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Spinner from '../common/Spinner'
import { getProfiles } from '../../actions/profileActions'

import Profile from './Profile'

class Profiles extends Component {
  componentDidMount() {
    this.props.onGetProfiles();
  }

  render() {
    const { profiles, loading } = this.props;
    let profileItems;

    if (profiles === null || loading === true) {
      profileItems = <Spinner />;
    } else {
      if (profiles.data.length > 0) {
        profileItems = profiles.data.map((profile) => {
          return <Profile key={profile.id} profile={profile} />
        })
      } else {
        profileItems = <h4>No users found...</h4>;
      }
    }

    return (
      <div className="profiles">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center">Users profiles</h1>
              <p className="lead-text-center">
                See all users available
              </p>
              {profileItems}
            </div>
          </div>
        </div>
      </div>
    );
  }
}


Profiles.propTypes = {
  onGetProfiles: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => {
  return {
    profiles: state.profile.profiles,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetProfiles: () => dispatch(getProfiles())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profiles);
