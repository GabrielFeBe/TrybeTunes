import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';
import decode from 'jwt-decode';
import { connect } from 'react-redux';
import logo from '../../svg/logo.svg';
import Loading from '../utils/Loading';
import { creatingUser, login } from '../../services/trybetunesBe';
import { fetchProfile } from '../../redux/actions';

// const TRES = 3;
const SEGUNDOS = 1500;

class LoginOrRegister extends Component {
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
    const { history, dispatch } = this.props;
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const objBody = { email: formData.get('email'),
      password: formData.get('password') };
    console.log(objBody);
    this.setState({ trigger: true });
    const response = await login(objBody);
    const { token } = response;
    Cookies.set('token', token, { expires: 1 });
    dispatch(fetchProfile(this.decodingToken(token).id));
    setTimeout(() => {
      history.push('/search');
      this.setState({ trigger: false });
    }, SEGUNDOS);
  };

  decodingToken = (token) => {
    const tokenDecoded = decode(token);
    return tokenDecoded;
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
  dispatch: PropTypes.func.isRequired,
};

export default connect()(LoginOrRegister);
