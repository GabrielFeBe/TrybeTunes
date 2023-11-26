import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Vortex } from 'react-loader-spinner';
import { connect } from 'react-redux';
import Cookies from 'js-cookie';
import decode from 'jwt-decode';
import PropTypes from 'prop-types';
import logo from '../svg/logo.svg';
import search from '../svg/icons/search.svg';
import favorites from '../svg/icons/favorite.svg';
import profile from '../svg/icons/profile.svg';
import { fetchProfile } from '../redux/actions';

class Header extends Component {
  constructor() {
    super();
    this.state = {
    };
  }

  componentDidMount() {
    const { dispatch, profileSucess } = this.props;
    const token = Cookies.get('token');
    const payload = decode(token);
    if (!profileSucess.userId) dispatch(fetchProfile(payload.id));
  }

  render() {
    const { profileSucess, profileLoading, profileError } = this.props;

    if (profileError) {
      return (
        <div>
          <h1>Erro ao carregar perfil</h1>
        </div>
      );
    }

    return (
      <header data-testid="header-component">
        <img src={ logo } alt="logo" className="logo" />
        <div>
          <Link to="/search" data-testid="link-to-search">
            <div
              style={ {
                backgroundImage: `url(${search})`,

              } }
            />

            Search

          </Link>
          <Link to="/favorites" data-testid="link-to-favorites">
            <div
              style={ {
                backgroundImage: `url(${favorites})`,

              } }
            />

            Favorites

          </Link>
          <Link to="/profile" data-testid="link-to-profile">
            <div
              style={ {
                backgroundImage: `url(${profile})`,

              } }
            />

            Profile

          </Link>
        </div>
        { profileLoading ? (
          <h1 className="loading-profile profile">
            <Vortex
              visible
              height="40"
              width="40"
              ariaLabel="vortex-loading"
              wrapperStyle={ {} }
              wrapperClass="vortex-wrapper"
              colors={
                ['#00D5E2', '#00D5E2', '#00D5E2', '#00D5E2', '#00D5E2', '#00D5E2']
              }
            />
            Carregando...
          </h1>)
          : (
            <div className="profile">
              <img src={ profileSucess.image } alt="Foto de Perfil" />
              <h1>{profileSucess.name}</h1>
            </div>)}
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  fetchLoading: state.profileReducer.profileLoading,
  profileSucess: state.profileReducer.profileInformations,
  fetchError: state.profileReducer.profileError,
});

Header.propTypes = {
  dispatch: PropTypes.func.isRequired,
  profileSucess: PropTypes.shape({
    userId: PropTypes.string,
    name: PropTypes.string,
    email: PropTypes.string,
    image: PropTypes.string,
  }).isRequired,
  profileLoading: PropTypes.bool.isRequired,
  profileError: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
