import React, { Component } from 'react';
import Header from './Header';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

export default class Favorites extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      favMusics: [],
    };
  }

  componentDidMount() {
    this.gettingFavoriteSongs();
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

  gettingFavoriteSongs = async () => {
    this.setState({ loading: true });
    const handleFavoritSongs = await getFavoriteSongs();
    this.setState({ loading: false });
    this.setState(({ favMusics }) => ({
      favMusics: [...favMusics, ...handleFavoritSongs] }), () => {
      const { favMusics } = this.state;
      favMusics.forEach(({ trackName }) => {
        console.log(trackName);
        this.setState({ [trackName]: true });
      });
    });
  };

  render() {
    const { loading, favMusics } = this.state;
    return (
      <div
        data-testid="page-favorites"
        className="page"
      >
        <Header />
        {loading ? <h1>Carregando...</h1>
          : (
            <main>
              <div className="h2-sect-fav">
                Músicas Favoritas
              </div>

              <div className="favorites-box">

                { favMusics.map((musica, index) => {
                  const { trackName, previewUrl, trackId,
                  } = musica;
                  const { state } = this;
                  return (
                    <div key={ index }>
                      <p>{trackName}</p>
                      <audio data-testid="audio-component" src={ previewUrl } controls>
                        <track kind="captions" />
                        O seu navegador não suporta o elemento
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
                            if (state[trackName]) {
                              this.handleChange(event);
                              this.setState({ loading: true });
                              await removeSong(favMusics[event.target.value]);
                              this.setState({ favMusics: await getFavoriteSongs() });
                              this.setState({ loading: false });
                            }
                          } }
                        />
                      </label>
                    </div>

                  );
                }) }
              </div>

            </main>

          )}
      </div>

    );
  }
}
