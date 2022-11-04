import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MusicCard extends Component {
  render() {
    const { songInfo, handleChange, index, checked } = this.props;
    const { trackName, previewUrl, trackId } = songInfo;
    return (
      <div>
        <p>{ trackName }</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
        </audio>
        <label htmlFor={ index }>
          Favorita
          <input
            type="checkbox"
            name={ index }
            id={ index }
            data-testid={ `checkbox-music-${trackId}` }
            onChange={ (event) => handleChange(event, songInfo) }
            checked={ checked }
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  songInfo: PropTypes.shape().isRequired,
  handleChange: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  checked: PropTypes.bool.isRequired,
};

export default MusicCard;
