import React, { Component } from 'react';
import Header from './Header';
import getMusics from '../services/musicsAPI';

export default class Album extends Component {
  constructor() {
    super();
    this.state = {
      musics: [],
    };
  }

  componentDidMount() {
    this.setMusicState();
  }

  setMusicState = async () => {
    const { match: { params } } = this.props;
    console.log(params);
    const getAlbum = await getMusics(params.id);
    this.setState((prev) => ({ musics: [...prev.musics, ...getAlbum] }));
  };

  render() {
    const { musics } = this.state;
    return (
      <div data-testid="page-album">
        {console.log(musics)}
        <Header />
        {musics.map((musica, index) => {
          const { artistName, collectionName, trackName, previewUrl,
          } = musica;
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
            </div>
          );
        })}
      </div>
    );
  }
}
