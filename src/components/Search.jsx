import React, { Component } from 'react';
import Header from './Header';

export default class Search extends Component {
  constructor() {
    super();
    this.state = {
      bandOrArtist: '',
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
    const { bandOrArtist } = this.state;
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
        <button disabled={ bandOrArtist.length < 2 } data-testid="search-artist-button">Pesquisar</button>
      </div>
    );
  }
}
