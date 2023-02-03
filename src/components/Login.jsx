import React, { Component } from 'react';
import { createUser } from '../services/userAPI';

const TRES = 3;

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      login: '',
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
    const { login, trigger } = this.state;
    return (
      <div data-testid="page-login">
        Login
        <input
          type="text"
          data-testid="login-name-input"
          onChange={ this.handleChange }
          name="login"
        />
        <button
          data-testid="login-submit-button"
          onClick={ async () => {
            this.setState({ trigger: true });
            await createUser({ name: login });
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
