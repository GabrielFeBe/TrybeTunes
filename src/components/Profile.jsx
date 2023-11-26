import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';
import Header from './Header';

class Profile extends Component {
  constructor() {
    super();
    this.state = {
    };
  }

  componentDidMount() {
    this.handeUserInfo();
  }

  handeUserInfo = async () => {
    const { dispatch, profileSucess } = this.props;

    if (!profileSucess.id) {
      const token = Cookies.get('token');
      const payload = decode(token);
      dispatch(fetchProfile(payload.id));
    }
  };

  render() {
    const { profileLoading, profileSucess } = this.props;
    return (
      <div data-testid="page-profile" className="page">
        <Header />
        {profileLoading && <h1>Carregando...</h1>}
        {profileLoading || (
          <main>
            <div className="h2-default-section" />
            <section className="profile-section">
              <img
                src={ profileSucess.image }
                alt={ profileSucess.name }
                data-testid="profile-image"
              />
              <div>
                <h2>
                  Name
                  <small>
                    {profileSucess.name}
                  </small>
                </h2>
                <h2>
                  Email
                  <small>
                    {profileSucess.email}
                  </small>
                </h2>
                <h2>
                  Description
                  <small>
                    {profileSucess.description}
                  </small>
                </h2>
                <Link to="/profile/edit">Editar perfil</Link>
              </div>

            </section>
          </main>

        )}
      </div>
    );
  }
}
Profile.propTypes = {
  dispatch: PropTypes.func.isRequired,
  profileSucess: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    email: PropTypes.string,
    image: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
  profileLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  fetchLoading: state.profileReducer.profileLoading,
  profileSucess: state.profileReducer.profileInformations,
  fetchError: state.profileReducer.profileError,
});

export default connect(mapStateToProps)(Profile);
