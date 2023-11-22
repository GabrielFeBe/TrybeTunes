import React, { Component } from 'react';
import Header from './Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import searchWhite from '../svg/icons/searchWhite.svg';
import Button from './search/Button';
import Album from './search/Album';

export default class Search extends Component {
  constructor() {
    super();
    this.state = {
      bandOrArtist: '',
      arrayOfAlbuns: [],
      artistNameSaved: '',
      trigger: false,
      loading: false,
    };
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

  searchingForAlbum = async () => {
    const { bandOrArtist } = this.state;
    const generateArray = await searchAlbumsAPI(bandOrArtist);
    this.setState({ artistNameSaved: bandOrArtist });
    this.setState({ loading: true });
    this.setState({ bandOrArtist: '' });
    this.setState(() => ({
      arrayOfAlbuns: generateArray,
      trigger: true,
      loading: false }));
  };

  render() {
    const { bandOrArtist, arrayOfAlbuns, trigger, loading, artistNameSaved } = this.state;
    return (
      <div
        data-testid="page-search"
        className="page"
      >
        <Header />
        <main>
          <section className="searchSection">
            <div className="input-container">

              <input
                type="text"
                data-testid="search-artist-input"
                name="bandOrArtist"
                onChange={ this.handleChange }
                value={ bandOrArtist }
                placeholder="Digite aqui o nome do artista ou banda"
              />
              <Button
                handleChange={ this.searchingForAlbum }
                imageLink={ searchWhite }
                disabled={ bandOrArtist.length < 2 }
              />
            </div>

            <button
              className="searchButton"
              disabled={ bandOrArtist.length < 2 }
              data-testid="search-artist-button"
              onClick={ this.searchingForAlbum }
            >
              Pesquisar

            </button>
          </section>

          <section className="albumsSection">

            {loading && <p>Carregando...</p>}
            {arrayOfAlbuns.length === 0 && trigger
            && <h2> Nenhum álbum foi encontrado</h2> }
            {arrayOfAlbuns.length > 0
        && <h2>{`Resultado de álbuns de: ${artistNameSaved}`}</h2>}
            <div className="carousel">
              {arrayOfAlbuns.map((album, index) => (

                <figure
                  key={ index }
                >
                  <Album album={ album } />
                </figure>
              ))}
            </div>

          </section>

        </main>

      </div>
    );
  }
}
