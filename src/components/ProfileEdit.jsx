import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import decode from 'jwt-decode';
import Cookies from 'js-cookie';
import Header from './Header';
import LoadingSearch from './utils/LoadingSearch';
import fetchProfileForPage from '../services/fetchProfileForPage';
import { updateProfileLocally } from '../redux/actions';
import updateProfile from '../services/updateProfile';

class ProfileEdit extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      login: '',
      email: '',
      image: '',
      description: '',
      newImage: '',
      password: '',
    };
  }

  componentDidMount() {
    this.handeUserInfo();
  }

  handeUserInfo = async () => {
    const { profileSucess } = this.props;
    if (profileSucess.id) {
      this.setState({ login: profileSucess.name,
        email: profileSucess.email,
        image: profileSucess.image,
        description: profileSucess.description });
    } else {
      this.setState({ loading: true });
      const token = Cookies.get('token');
      const payload = decode(token);
      const response = await fetchProfileForPage(payload.id);
      this.setState({ login: response.name,
        email: response.email,
        image: response.image,
        description: response.description,
        loading: false });
    }
  };

  handleChange = ({ target }) => {
    const { name } = target;
    const value = (target.type === 'checkbox') ? target.checked : target.value;
    this.setState({
      [name]: value,
    }, this.handleError);
  };

  handleValidation = () => {
    const { login, email, description, newImage, password } = this.state;
    const emailRegex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    const arrayOfBoll = [login, email, newImage, description, password];
    const testOfArray = arrayOfBoll.every((value) => value.length > 1);
    return emailRegex.test(email) && testOfArray;
  };

  render() {
    const { loading, login, email, description, image, newImage, password } = this.state;
    const { history: { push }, dispatch, profileSucess: { id } } = this.props;
    return (
      <div data-testid="page-profile-edit" className="page">
        <Header />
        {loading && <LoadingSearch />}
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
                  name="newImage"
                  data-testid="edit-input-image"
                  placeholder="Insira um link"
                  value={ newImage }
                  onChange={ this.handleChange }
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
                <label htmlFor="password">
                  Password
                  <input
                    name="password"
                    id="password"
                    type="password"
                    onChange={ this.handleChange }
                    value={ password }
                    placeholder="Password"
                  />
                </label>
                <button
                  data-testid="edit-button-save"
                  type="button"
                  disabled={ !this.handleValidation() }
                  onClick={ async () => {
                    const userObj = { name: login,
                      email,
                      image: newImage,
                      description,
                      password };
                    const token = Cookies.get('token');
                    await updateProfile(id, userObj, token);
                    dispatch(updateProfileLocally(userObj));
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
  profileSucess: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    email: PropTypes.string,
    image: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  fetchLoading: state.profileReducer.profileLoading,
  profileSucess: state.profileReducer.profileInformations,
  fetchError: state.profileReducer.profileError,
});

export default connect(mapStateToProps)(ProfileEdit);
