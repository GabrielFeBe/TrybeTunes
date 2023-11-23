import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import { getUser, updateUser } from '../services/userAPI';

export default class ProfileEdit extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      login: '',
      email: '',
      image: '',
      description: '',
      newImage: '',
    };
  }

  componentDidMount() {
    this.handeUserInfo();
  }

  handeUserInfo = async () => {
    this.setState({ loading: true });
    const userInfo = await getUser();
    const { name, email, image, description } = userInfo;
    this.setState({ loading: false });
    this.setState({ login: name, email, image, description });
  };

  handleChange = ({ target }) => {
    const { name } = target;
    const value = (target.type === 'checkbox') ? target.checked : target.value;
    this.setState({
      [name]: value,
    }, this.handleError);
  };

  handleValidation = () => {
    const { login, email, description, newImage } = this.state;
    const emailRegex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    const arrayOfBoll = [login, email, newImage, description];
    const testOfArray = arrayOfBoll.every((value) => value.length > 1);
    return emailRegex.test(email) && testOfArray;
  };

  render() {
    const { loading, login, email, description, image, newImage } = this.state;
    const { history: { push } } = this.props;
    return (
      <div data-testid="page-profile-edit" className="page">
        <Header />
        {loading && <h1>Carregando...</h1>}
        {!loading && (
          <main>
            <div className="h2-default-section" />
            <section className="profile-section edit-profile">
              <img src={ image } alt="person" />
              <label
                htmlFor="link"
                className="input-image"
              >
                <input
                  type="text"
                  id="link"
                  namel="link"
                  data-testid="edit-input-image"
                  placeholder="Insira um link"
                  value={ newImage }
                  onChange={ this.handleChange }
                  name="image"
                />

              </label>
              <form action="">
                <label htmlFor="login">
                  Name
                  <small>Fell free to put your username</small>
                  <input
                    id="login"
                    type="text"
                    value={ login }
                    data-testid="edit-input-name"
                    name="login"
                    onChange={ this.handleChange }
                    placeholder="example_name"
                  />
                </label>
                <label htmlFor="email">
                  Email
                  <small>Chose an email that you use daily</small>
                  <input
                    id="email"
                    type="text"
                    name="email"
                    value={ email }
                    onChange={ this.handleChange }
                    data-testid="edit-input-email"
                    placeholder="example_email@email.com"
                  />
                </label>
                <label htmlFor="description">
                  Description
                  <textarea
                    name="description"
                    id="description"
                    cols="30"
                    rows="10"
                    onChange={ this.handleChange }
                    value={ description }
                    data-testid="edit-input-description"
                    placeholder="Tell us about yourself"
                  />
                </label>

                <button
                  data-testid="edit-button-save"
                  disabled={ !this.handleValidation() }
                  onClick={ () => {
                    updateUser({ name: login, email, newImage, description });
                    push('/profile');
                  } }
                >
                  Save
                </button>
              </form>

            </section>
          </main>

        )}

      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
