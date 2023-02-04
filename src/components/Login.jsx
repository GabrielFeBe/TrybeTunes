import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';

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
      <div data-testid="page-login">
        Login
        <input
          type="text"
          data-testid="login-name-input"
          onChange={ this.handleChange }
          name="login"
        />
        <div>
          Email
          <input
            type="text"
            name="email"
            value={ email }
            onChange={ this.handleChange }
          />
          <div>
            Description
            <textarea
              type="text"
              name="description"
              value={ description }
              onChange={ this.handleChange }
            />
          </div>
          <div>
            Image.jpg
            <input
              type="text"
              name="image"
              onChange={ this.handleChange }
              value={ image }
            />

          </div>
        </div>
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
        {console.log(this.props)}
        {trigger && <p>Carregando...</p>}
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
