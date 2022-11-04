import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MusicCard extends Component {
  render() {
    const { songInfo } = this.props;
    const { trackName, previewUrl } = songInfo;
    return (
      <div>
        <p>{ trackName }</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="caption" />
        </audio>
      </div>
    );
  }
}

MusicCard.propTypes = {
  songInfo: PropTypes.shape().isRequired,
};

export default MusicCard;
