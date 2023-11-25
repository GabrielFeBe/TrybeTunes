import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from './utils/Loading';
import LoginOrRegister from './forms/LoginOrRegister';

export default class Register extends Component {
  constructor() {
    super();
    this.state = {
      login: '',
      email: '',
      image: '',
      description: '',
      trigger: false,
      password: '',
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
    const { login, trigger, email, image, description, password } = this.state;

    if (trigger) return <Loading />;

    return (
      <LoginOrRegister history={ history }>
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
        <label htmlFor="password">
          Password
          <input
            id="password"
            type="password"
            name="password"
            onChange={ this.handleChange }
            value={ password }
          />

        </label>
      </LoginOrRegister>
    );
  }
}

Register.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
