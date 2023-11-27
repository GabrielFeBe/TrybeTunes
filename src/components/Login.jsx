import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from './utils/Loading';
import LoginOrRegister from './forms/LoginOrRegister';

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
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
    const { trigger, email, password } = this.state;

    if (trigger) return <Loading />;

    return (
      <LoginOrRegister history={ history } className="login-form">

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

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
