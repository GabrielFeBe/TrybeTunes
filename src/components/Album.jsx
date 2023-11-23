import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import getMusics from '../services/musicsAPI';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Song from './utils/Song';

export default class Album extends Component {
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

  setMusicState = async () => {
    const { match: { params } } = this.props;
    const getAlbum = await getMusics(params.id);
    this.setState({ albumInfo: getAlbum[0] });
    this.setState((prev) => ({ musics: [...prev.musics, ...getAlbum] }));
  };

  handleFavoriteSongs = async () => {
    this.setState({ loading: true });
    const gettingFavSongs = await getFavoriteSongs();
    this.setState({ loading: false });
    gettingFavSongs.forEach(({ trackName }) => {
      this.setState({ [trackName]: true });
    });
  };

  handleChange = ({ target }) => {
    const { name } = target;
    const value = (target.type === 'checkbox') ? target.checked : target.value;
    this.setState({
      [name]: value,
    }, this.handleError);
  };

  addOrRemoveSong = async (event, trackName) => {
    const { musics } = this.state;
    const { state } = this;
    if (state[trackName]) {
      this.handleChange(event);
      this.setState({ loading: true });
      await removeSong(musics[event.target.value]);
      this.setState({ loading: false });
    } else {
      this.handleChange(event);
      console.log(event.target.value);
      this.setState({ loading: true });
      await addSong(musics[event.target.value]);
      this.setState({ loading: false });
    }
  };

  render() {
    const { musics, loading, albumInfo } = this.state;
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

              {!loading && musics.map((musica, index) => {
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
                      index={ index }
                      songPreview={ previewUrl }
                      name={ trackName }
                      handleChange={ this.addOrRemoveSong }
                      isFavorite={ !!state[trackName] }
                    />
                  </div>
                );
              })}
            </section>

            {loading && <h1>Carregando...</h1>}
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

};
