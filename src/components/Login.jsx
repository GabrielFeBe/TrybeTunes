import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import logo from '../svg/logo.svg';

const TRES = 3;

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      login: '',
      email: '',
      image: '',
      description: '',
      trigger: false,
    };
  }

  handleChange = ({ target }) => {
    const { name } = target;
    const value = (target.type === 'checkbox') ? target.checked : target.value;
    this.setState({
      [name]: value,
      // Após alterarmos o estado, chamamos a função que
      // verificará os erros.
    }, this.handleError);
  };

  render() {
    const { history } = this.props;
    const { login, trigger, email, image, description } = this.state;
    return (
      <main data-testid="page-login" className="login-page">
        <div>
          <img src={ logo } alt="" />
          <label htmlFor="login">

            Login
            <input
              type="text"
              id="login"
              value={ login }
              data-testid="login-name-input"
              onChange={ this.handleChange }
              name="login"
            />
          </label>

          <label htmlFor="email">
            Email
            <input
              id="email"
              type="text"
              name="email"
              value={ email }
              onChange={ this.handleChange }
            />
          </label>

          <label htmlFor="description">
            Description
            <textarea
              type="text"
              name="description"
              value={ description }
              onChange={ this.handleChange }
              id="description"
            />
          </label>
          <label htmlFor="link">
            Image.jpg
            <input
              id="link"
              type="text"
              name="image"
              onChange={ this.handleChange }
              value={ image }
            />

          </label>
          <button
            data-testid="login-submit-button"
            onClick={ async () => {
              this.setState({ trigger: true });
              await createUser({ name: login, email, image, description });
              history.push('/search');
              this.setState({ trigger: false });
            } }
            disabled={ login.length < TRES }
          >
            Entrar

          </button>
          <button
            onClick={
              () => history.push('/register')
            }
          >
            Register
          </button>
        </div>
        {trigger && <p>Carregando...</p>}
      </main>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
