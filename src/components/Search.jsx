import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

export default class Search extends Component {
  constructor() {
    super();
    this.state = {
      bandOrArtist: '',
      arrayOfAlbuns: [],
      trigger: false,
      loading: false,
      saveArtistName: '',
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

  render() {
    const { bandOrArtist, arrayOfAlbuns, trigger, loading, saveArtistName } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <input
          type="text"
          data-testid="search-artist-input"
          name="bandOrArtist"
          onChange={ this.handleChange }
          value={ bandOrArtist }
        />
        <button
          disabled={ bandOrArtist.length < 2 }
          data-testid="search-artist-button"
          onClick={ async () => {
            this.setState({ loading: true });
            this.setState({ saveArtistName: bandOrArtist });
            this.setState({ bandOrArtist: '' });
            const generateArray = await searchAlbumsAPI(bandOrArtist);
            this.setState((prev) => ({
              arrayOfAlbuns: [...prev.arrayOfAlbuns, ...generateArray],
              trigger: true,
              loading: false }));
          } }
        >
          Pesquisar

        </button>
        {loading && <p>Carregando...</p>}
        {arrayOfAlbuns.length === 0 && trigger && <p> Nenhum álbum foi encontrado</p> }
        {/* {arrayOfAlbuns.length > 0 && <p><p>{`Resultado de álbuns de: ${arrayOfAlbuns[0].artistName}`}</p></p>} */}
        {arrayOfAlbuns.map((album, index) => {
          if (index !== 0 && album.artistName === arrayOfAlbuns[index - 1].artistName) {
            return (

              <div
                key={ index }
              >
                {console.log('alo')}
                <img src={ album.artworkUrl100 } alt="" />
                <p>{album.collectionName}</p>
                <Link
                  to={ `/album/${album.collectionId}` }
                  data-testid={ `link-to-album-${album.collectionId}` }
                >
                  link

                </Link>
              </div>
            );
          }
          return (
            <div
              key={ index }
            >
              <p>{`Resultado de álbuns de: ${saveArtistName}`}</p>
              <img src={ album.artworkUrl100 } alt="" />
              <p>{album.collectionName}</p>
              <Link
                to={ `/album/${album.collectionId}` }
                data-testid={ `link-to-album-${album.collectionId}` }
              >
                link

              </Link>
            </div>

          );
        })}
      </div>
    );
  }
}
