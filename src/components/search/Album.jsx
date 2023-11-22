import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class Album extends Component {
  render() {
    const { album } = this.props;
    return (
      <>
        <Link
          to={ `/album/${album.collectionId}` }
          data-testid={ `link-to-album-${album.collectionId}` }
        >
          <img src={ album.artworkUrl100 } alt="" />
          <p>{album.collectionName}</p>

        </Link>
        <figcaption>
          Artista
          {' '}
          {album.artistName}
        </figcaption>
      </>

    );
  }
}

Album.propTypes = {
  album: PropTypes.shape({
    artistId: PropTypes.number.isRequired,
    artistName: PropTypes.string.isRequired,
    collectionId: PropTypes.number.isRequired,
    collectionName: PropTypes.string.isRequired,
    collectionPrice: PropTypes.number.isRequired,
    artworkUrl100: PropTypes.string.isRequired,
    releaseDate: PropTypes.string.isRequired,
    trackCount: PropTypes.number.isRequired,
  }).isRequired,
};
