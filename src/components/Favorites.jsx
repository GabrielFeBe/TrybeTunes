import React, { Component } from 'react';
import Header from './Header';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Song from './utils/Song';

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

  unfavoritingSong = async (event, track) => {
    const { favMusics } = this.state;
    const { state } = this;
    if (state[track]) {
      this.handleChange(event);
      this.setState({ loading: true });
      await removeSong(favMusics[event.target.value]);
      this.setState({ favMusics: await getFavoriteSongs() });
      this.setState({ loading: false });
    }
  };

  render() {
    const { loading, favMusics } = this.state;
    const { state } = this;
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
              <section className="favorite-section">

                <div className="favorites-box">
                  { favMusics.map((musica, index) => {
                    const { trackName, previewUrl, trackId,
                    } = musica;
                    return (
                      <div key={ index }>
                        <Song
                          trackId={ trackId }
                          index={ index }
                          songPreview={ previewUrl }
                          name={ trackName }
                          handleChange={ this.unfavoritingSong }
                          isFavorite={ state[trackName] }
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
