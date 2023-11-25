import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../../services/userAPI';
import logo from '../../svg/logo.svg';
import Loading from '../utils/Loading';
import { creatingUser, login } from '../../services/trybetunesBe';

// const TRES = 3;

export default class LoginOrRegister extends Component {
  constructor() {
    super();
    this.state = {
      trigger: false,
    };
  }

  submitFormRegister = async (event) => {
    const { history } = this.props;
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const objBody = { name: formData.get('login'),
      email: formData.get('email'),
      description: formData.get('description'),
      image: formData.get('image'),
      password: formData.get('password') };
    try {
      this.setState({ trigger: true });
      await creatingUser(objBody);
      history.push('/');
      this.setState({ trigger: false });
    } catch (error) {
      console.log(error);
    }
  };

  submitFormLogin = async (event) => {
    const { history } = this.props;
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const objBody = { email: formData.get('email'),
      password: formData.get('password') };
    console.log(objBody);
    // this.setState({ trigger: true });
    const response = await login(objBody);
    const { token } = response;
    console.log(response);
    // history.push('/search');
    // this.setState({ trigger: false });
  };

  render() {
    const { history, children } = this.props;
    const { trigger } = this.state;
    const { location: { pathname } } = history;
    if (trigger) return <Loading />;
    const objOfFuctions = {
      '/register': this.submitFormRegister,
      '/': this.submitFormLogin,

    };
    return (
      <main data-testid="page-login" className="login-page">
        <div>
          <img src={ logo } alt="" />
          <form onSubmit={ objOfFuctions[pathname] }>
            {history.location.pathname}
            {children}
            <button
              data-testid="login-submit-button"
              type="submit"
            >
              Entrar

            </button>
            <button
              type="button"
              onClick={ () => {
                if (pathname === '/register') history.push('/');
                else { history.push('/register'); }
              } }
            >
              { pathname === '/' ? 'Register' : 'Login'}
            </button>
          </form>
        </div>
      </main>
    );
  }
}

LoginOrRegister.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
  }).isRequired,
  children: PropTypes.node.isRequired,
};
