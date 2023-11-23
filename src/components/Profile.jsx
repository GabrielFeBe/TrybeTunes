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
      <div data-testid="page-profile" className="page">
        <Header />
        {loading && <h1>Carregando...</h1>}
        {loading || (
          <main>
            <div className="h2-default-section" />
            <section className="profile-section">
              <img
                src={ useInfo.image }
                alt={ useInfo.name }
                data-testid="profile-image"
              />
              <div>
                <h2>
                  Name
                  <small>
                    {useInfo.name}
                  </small>
                </h2>
                <h2>
                  Email
                  <small>
                    {useInfo.email}
                  </small>
                </h2>
                <h2>
                  Description
                  <small>
                    {useInfo.description}
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
