import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MusicCard extends Component {
  render() {
    const { songInfo, handleChange } = this.props;
    const { trackName, previewUrl, trackId } = songInfo;
    return (
      <div>
        <p>{ trackName }</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
        </audio>
        <label htmlFor="favorited">
          <input
            type="checkbox"
            name="favorited"
            id="favorited"
            data-testid={ `checkbox-music-${trackId}` }
            onChange={ handleChange }
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  songInfo: PropTypes.shape().isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default MusicCard;
