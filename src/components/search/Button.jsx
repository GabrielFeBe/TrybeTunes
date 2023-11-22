import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Button extends Component {
  render() {
    const { imageLink, handleChange, disabled } = this.props;
    return (
      <button
        onClick={ handleChange }
        disabled={ disabled }
      >
        <img src={ imageLink } alt="" />
      </button>
    );
  }
}

// make the propTypes

Button.propTypes = {
  imageLink: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};
