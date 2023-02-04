import React, { Component } from 'react';
import Header from './Header';
import getMusics from '../services/musicsAPI';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';

export default class Album extends Component {
  constructor() {
    super();
    this.state = {
      musics: [],
      loading: false,
    };
  }

  componentDidMount() {
    this.setMusicState();
    this.handleFavoriteSongs();
  }

  setMusicState = async () => {
    const { match: { params } } = this.props;
    // console.log(params);
    const getAlbum = await getMusics(params.id);
    this.setState((prev) => ({ musics: [...prev.musics, ...getAlbum] }));
  };

  handleFavoriteSongs = async () => {
    const gettingFavSongs = await getFavoriteSongs();
    console.log(getFavoriteSongs);
    gettingFavSongs.forEach(({ trackName }) => {
      this.setState({ [trackName]: true });
    });
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

  render() {
    const { musics, loading } = this.state;
    return (
      <div data-testid="page-album">
        {/* {console.log(musics)} */}
        <Header />
        {!loading && musics.map((musica, index) => {
          const { artistName, collectionName, trackName, previewUrl, trackId,
          } = musica;
          const { state } = this;
          if (index === 0) {
            return (
              <div key={ index }>
                <div data-testid="artist-name">{artistName}</div>
                <div data-testid="album-name">{collectionName}</div>
              </div>
            );
          }
          return (
            <div key={ index }>
              <p>{trackName}</p>
              <audio data-testid="audio-component" src={ previewUrl } controls>
                <track kind="captions" />
                O seu navegador não suporta o elemento
                {' '}
                {' '}
                <code>audio</code>
                .
              </audio>
              <label htmlFor={ trackId }>
                Favorita
                <input
                  data-testid={ `checkbox-music-${trackId}` }
                  id={ trackId }
                  name={ trackName }
                  value={ index }
                  type="checkbox"
                  checked={ state[trackName] }
                  onChange={ async (event) => {
                    this.handleChange(event);
                    console.log(event.target.value);
                    this.setState({ loading: true });
                    await addSong(musics[event.target.value]);
                    this.setState({ loading: false });
                  } }
                />
              </label>
            </div>
          );
        })}
        {loading && <h1>Carregando...</h1>}
      </div>
    );
  }
}
