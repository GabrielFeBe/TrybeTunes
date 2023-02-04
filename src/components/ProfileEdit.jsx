import React, { Component } from 'react';
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
    console.log(name);
  };

  handleChange = ({ target }) => {
    const { name } = target;
    const value = (target.type === 'checkbox') ? target.checked : target.value;
    this.setState({
      [name]: value,
      // Após alterarmos o estado, chamamos a função que
      // verificará os erros.
    }, this.handleError);
  };

  handleValidation = () => {
    const { login, email, image, description } = this.state;
    const emailRegex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    const arrayOfBoll = [login, email, image, description];
    const testOfArray = arrayOfBoll.every((value) => value.length > 1);
    console.log(testOfArray);
    console.log(emailRegex.test(email));
    return emailRegex.test(email) && testOfArray;
  };

  render() {
    const { loading, login, email, description, image } = this.state;
    const { history: { push } } = this.props;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        {loading && <h1>Carregando...</h1>}
        {!loading && (
          <div>
            <input
              type="text"
              value={ login }
              data-testid="edit-input-name"
              name="login"
              onChange={ this.handleChange }
            />
            <input
              type="text"
              name="email"
              value={ email }
              onChange={ this.handleChange }
              data-testid="edit-input-email"
            />
            <textarea
              name="description"
              id="description"
              cols="30"
              rows="10"
              onChange={ this.handleChange }
              value={ description }
              data-testid="edit-input-description"
            />
            <input
              type="text"
              data-testid="edit-input-image"
              value={ image }
              onChange={ this.handleChange }
              name="image"
            />
            <button
              data-testid="edit-button-save"
              disabled={ !this.handleValidation() }
              onClick={ () => {
                updateUser({ name: login, email, image, description });
                push('/profile');
              } }
            >
              Save

            </button>
          </div>
        )}

      </div>
    );
  }
}
