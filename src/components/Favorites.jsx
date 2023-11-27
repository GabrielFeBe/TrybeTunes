import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';
import decode from 'jwt-decode';
import Header from './Header';
import Song from './utils/Song';
import { fetchProfile } from '../redux/actions';
import LoadingSearch from './utils/LoadingSearch';

class Favorites extends Component {
  constructor() {
    super();
    this.state = {
      favMusics: [],
    };
  }

  componentDidMount() {
    this.handleFavoriteSongs();
  }

  componentDidUpdate(prevProps) {
    const { profileSucess } = this.props;
    // Verifica se profileSucess.favorites existe e se mudou desde a última atualização
    if (
      profileSucess
      && profileSucess.favorites
      && profileSucess.favorites !== prevProps.profileSucess.favorites
    ) {
      this.handleFavoriteSongs();
    }
  }

  handleFavoriteSongs = async () => {
    const { profileSucess, dispatch } = this.props;
    if (!profileSucess.favorites) {
      const token = Cookies.get('token');
      const payload = decode(token);
      dispatch(fetchProfile(payload.id));
    } else {
      this.setState({ favMusics: profileSucess.favorites });
      profileSucess.favorites.forEach(({ trackName, id }) => {
        this.setState({ [trackName]: id });
      });
    }
  };

  removingSongFromState = (trackName) => {
    this.setState({ [trackName]: false });
  };

  render() {
    const { favMusics } = this.state;
    const { fetchLoading } = this.props;
    const { state } = this;
    return (
      <div
        data-testid="page-favorites"
        className="page"
      >
        <Header />
        {fetchLoading ? <LoadingSearch />
          : (
            <main>
              <div className="h2-default-section">
                Músicas Favoritas
              </div>
              <section className="favorite-section">

                <div className="favorites-box">
                  { favMusics.map((musica, index) => {
                    const { trackName, previewUrl, trackId,
                    } = musica;
                    return (
                      <div key={ index }>
                        <Song
                          trackId={ trackId }
                          favoriteId={ state[trackName] }
                          songPreview={ previewUrl }
                          removingSongFromState={ this.removingSongFromState }
                          name={ trackName }
                          isFavorite={ !!state[trackName] }
                        />
                      </div>

                    );
                  }) }
                </div>
              </section>

            </main>

          )}
      </div>

    );
  }
}

const mapStateToProps = (state) => ({
  fetchLoading: state.profileReducer.profileLoading,
  profileSucess: state.profileReducer.profileInformations,
  fetchError: state.profileReducer.profileError,
});

Favorites.propTypes = {
  dispatch: PropTypes.func.isRequired,
  profileSucess: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    email: PropTypes.string,
    image: PropTypes.string,
    description: PropTypes.string,
    favorites: PropTypes.arrayOf(PropTypes.shape({
      trackName: PropTypes.string,
    })),
  }).isRequired,
  fetchLoading: PropTypes.bool.isRequired,

};

export default connect(mapStateToProps)(Favorites);
