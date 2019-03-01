import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Spinner from '../common/Spinner'
import { getProfiles } from '../../actions/profileActions'
import Pagination from '../common/Pagination';

import Profile from './Profile'

class Profiles extends Component {
  componentDidMount() {
    this.props.onGetProfiles();
  }

  render() {
    const { profiles, loading } = this.props;
    let profileItems;
    const page = profiles ? profiles.page : null;
    const per_page = profiles ? profiles.per_page : null;
    const total = profiles ? profiles.total : null;
    const total_pages = profiles ? profiles.total_pages : null;
    const users = profiles ? profiles.data : null;

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
        {/* {<Pagination users={users} currentPage={page} perPage={per_page} />} */}
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
