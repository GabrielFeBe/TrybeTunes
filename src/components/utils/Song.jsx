import React, { Component } from 'react';
import PropTypes, { shape } from 'prop-types';
import { connect } from 'react-redux';
import Cookies from 'js-cookie';
import decode from 'jwt-decode';
import { creatingFavorite, deletingFavorite } from '../../services/favoritesService';
import { updatingFavoritesLocally } from '../../redux/actions';
import fullHeart from '../../svg/icons/fullHeart.svg';
import emptyHeart from '../../svg/icons/emptyHeart.svg';

class Song extends Component {
  favoriteFunc = async (favoriteObj, token) => {
    const { dispatch } = this.props;
    const { favorites } = this.props;
    const resp = await creatingFavorite(favoriteObj, token);

    dispatch(updatingFavoritesLocally([...favorites, resp]));
  };

  unfavoritedFunc = async (id, token) => {
    const { dispatch } = this.props;
    const { favorites } = this.props;
    await deletingFavorite(id, token);
    const newFavArray = favorites.filter((favorite) => +favorite.id !== +id);
    dispatch(updatingFavoritesLocally([...newFavArray]));
  };

  render() {
    const { name, songPreview,
      trackId, isFavorite, favoriteId, removingSongFromState } = this.props;
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
        <button
          type="button"
          className="button-favorite"
          onClick={ async () => {
            const token = Cookies.get('token');
            const payload = decode(token);
            const favoriteObj = {
              accountId: payload.id,
              trackId,
              trackName: name,
              previewUrl: songPreview,
            };
            if (isFavorite) {
              await this.unfavoritedFunc(favoriteId, token);
              removingSongFromState(name);
            } else {
              await this.favoriteFunc(favoriteObj, token);
            }
          } }
        >
          {isFavorite ? (
            <img src={ fullHeart } alt="" />

          )
            : (
              <img src={ emptyHeart } alt="" />
            )}
        </button>
      </div>
    );
  }
}

Song.propTypes = {
  name: PropTypes.string.isRequired,
  songPreview: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  isFavorite: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  favoriteId: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.bool,
  ]).isRequired,
  favorites: PropTypes.arrayOf(shape({
    id: PropTypes.number,
    trackId: PropTypes.number,
    trackName: PropTypes.string,
    previewUrl: PropTypes.string,
    accountId: PropTypes.number,
  })).isRequired,
  removingSongFromState: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  favorites: state.profileReducer.profileInformations.favorites,
});

export default connect(mapStateToProps)(Song);
