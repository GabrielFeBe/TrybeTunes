import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Vortex } from 'react-loader-spinner';
import { getUser } from '../services/userAPI';
import logo from '../svg/logo.svg';
import search from '../svg/icons/search.svg';
import favorites from '../svg/icons/favorite.svg';
import profile from '../svg/icons/profile.svg';

export default class Header extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      profileO: '',
    };
  }

  componentDidMount() {
    this.getingData();
  }

  getingData = async () => {
    const name = await getUser();
    this.setState({ loading: false });
    this.setState({ profileO: name });
  };

  render() {
    const { loading, profileO } = this.state;

    return (
      <header data-testid="header-component">

        <img src={ logo } alt="logo" className="logo" />
        <div>
          <Link to="/search" data-testid="link-to-search">
            {/* <img src={ search } alt="search" /> */}
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
        { loading ? (
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
              <img src={ profileO.image } alt="Foto de Perfil" />
              <h1>{profileO.name}</h1>
            </div>)}
      </header>
    );
  }
}
