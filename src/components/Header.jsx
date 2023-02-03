import React, { Component } from 'react';
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
        <div data-testid="header-user-name">{loading ? 'Carregando...' : `${name.name}`}</div>
      </header>
    );
  }
}
