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
    const { bandOrArtist, arrayOfAlbuns, trigger, loading } = this.state;
    return (
      <div
        data-testid="page-search"
        style={ { minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',

        } }
      >
        <Header />
        <main
          style={ {
            width: '1000px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '20px',
            height: '500px',
            overflowY: 'auto',
          } }
        >
          <div>
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
                this.setState({ bandOrArtist: '' });
                const generateArray = await searchAlbumsAPI(bandOrArtist);
                this.setState(() => ({
                  arrayOfAlbuns: [...generateArray],
                  trigger: true,
                  loading: false }));
              } }
            >
              Pesquisar

            </button>
          </div>

          {loading && <p>Carregando...</p>}
          {arrayOfAlbuns.length === 0 && trigger && <p> Nenhum álbum foi encontrado</p> }
          {arrayOfAlbuns.length > 0
        && <p><p>{`Resultado de álbuns de: ${arrayOfAlbuns[0].artistName}`}</p></p>}
          {arrayOfAlbuns.map((album, index) => (

            <div
              key={ index }
            >

              <Link
                to={ `/album/${album.collectionId}` }
                data-testid={ `link-to-album-${album.collectionId}` }
              >
                <img src={ album.artworkUrl100 } alt="" />
                <p>{album.collectionName}</p>

              </Link>
            </div>
          ))}
        </main>

      </div>
    );
  }
}
