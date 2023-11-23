import React, { Component } from 'react';
import notFound from '../../svg/icons/notFound.svg';

export default class DidNotFoundAlbum extends Component {
  render() {
    return (
      <section className="loading-search">
        <img src={ notFound } alt="" className="img-notfound" />
        <h2> Album not found</h2>
      </section>
    );
  }
}
