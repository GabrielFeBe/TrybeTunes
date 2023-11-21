import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';

export default class Header extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      name: '',
    };
  }

  componentDidMount() {
    this.getingData();
  }

  getingData = async () => {
    const name = await getUser();
    this.setState({ loading: false });
    this.setState({ name });
  };

  render() {
    const { loading, name } = this.state;
    return (
      <header data-testid="header-component">
        <h1 data-testid="header-user-name" style={ { margin: '0' } }>
          {loading ? 'Carregando...' : `${name.name}`}
        </h1>
        <Link to="/search" data-testid="link-to-search">Search</Link>
        <Link to="/favorites" data-testid="link-to-favorites">Favorites</Link>
        <Link to="/profile" data-testid="link-to-profile">Profile</Link>
      </header>
    );
  }
}
