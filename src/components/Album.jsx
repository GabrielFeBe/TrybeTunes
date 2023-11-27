import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Cookies from 'js-cookie';
import decode from 'jwt-decode';
import Header from './Header';
import getMusics from '../services/musicsAPI';
import Song from './utils/Song';
import fetchProfile from '../services/fetchProfile';

class Album extends Component {
  constructor() {
    super();
    this.state = {
      musics: [],
      loading: false,
      albumInfo: {},
    };
  }

  componentDidMount() {
    this.setMusicState();
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
      profileSucess.favorites.forEach(({ trackName, id }) => {
        this.setState({ [trackName]: id });
      });
    }
  };

  setMusicState = async () => {
    const { match: { params } } = this.props;
    this.setState({ loading: true });
    const getAlbum = await getMusics(params.id);

    this.setState({ albumInfo: getAlbum[0] });
    this.setState((prev) => ({ musics: [...prev.musics, ...getAlbum] }));
    this.setState({ loading: false });
  };

  removingSongFromState = (trackName) => {
    this.setState({ [trackName]: false });
  };

  render() {
    const { musics, loading, albumInfo } = this.state;
    const { fetchLoading } = this.props;
    return (
      <div data-testid="page-album" className="page">
        <Header />
        <main>
          <div className="h2-default-section" />
          <section className="album-section">
            <img src={ albumInfo.artworkUrl100 } alt="" />
            <div className="album-name">
              <h2>{albumInfo.collectionName}</h2>
              <small>{albumInfo.artistName}</small>
            </div>
            <section className="songs-album-section">

              {!fetchLoading && !loading && musics.map((musica, index) => {
                const { trackName, previewUrl, trackId,
                } = musica;
                const { state } = this;
                if (index === 0) {
                  return;
                }
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
              })}
            </section>

            {loading && fetchLoading && <h1>Carregando...</h1>}
          </section>

        </main>

      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired }),
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
  profileSucess: PropTypes.shape({
    favorites: PropTypes.arrayOf(PropTypes.shape({
      trackName: PropTypes.string,
    })),
  }).isRequired,
  fetchLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  fetchLoading: state.profileReducer.profileLoading,
  profileSucess: state.profileReducer.profileInformations,
  fetchError: state.profileReducer.profileError,
});

export default connect(mapStateToProps)(Album);
