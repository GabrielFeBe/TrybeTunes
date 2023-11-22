import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Song extends Component {
  render() {
    const { name, songPreview, index, handleChange, trackId, isFavorite } = this.props;
    const [split] = name.split('(');

    return (
      <div className="songPreview">
        <small>{split}</small>
        <audio data-testid="audio-component" src={ songPreview } controls>
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
            name={ name }
            value={ index }
            type="checkbox"
            checked={ isFavorite }
            onChange={ (event) => {
              handleChange(event, name);
            } }
          />
        </label>
      </div>
    );
  }
}

Song.propTypes = {
  name: PropTypes.string.isRequired,
  songPreview: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  trackId: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  isFavorite: PropTypes.bool.isRequired,
};
