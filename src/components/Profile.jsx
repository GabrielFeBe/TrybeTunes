import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import { getUser } from '../services/userAPI';

export default class Profile extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      useInfo: {},
    };
  }

  componentDidMount() {
    this.handeUserInfo();
  }

  handeUserInfo = async () => {
    this.setState({ loading: true });
    const userInfo = await getUser();
    this.setState({ loading: false });
    this.setState({ useInfo: userInfo });
    console.log(userInfo);
  };

  render() {
    const { loading, useInfo } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        {loading && <h1>Carregando...</h1>}
        {loading || (
          <div>
            <p>{useInfo.name}</p>
            <img
              src={ useInfo.image }
              alt={ useInfo.name }
              data-testid="profile-image"
            />
            <p>{useInfo.email}</p>
            <p>{useInfo.description}</p>
            <Link to="/profile/edit">Editar perfil</Link>
          </div>)}
      </div>
    );
  }
}
