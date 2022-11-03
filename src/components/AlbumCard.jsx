import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class AlbumCard extends Component {
  render() {
    const { album } = this.props;
    return (
      <div>
        <p>{ album.artistName }</p>
        <p>{ album.collectionName }</p>
        <img src={ album.artworkUrl100 } alt={ album.collectionName } />
        <Link
          to={ `/album/${album.collectionId}` }
          data-testid={ `link-to-album-${album.collectionId}` }
        />

      </div>
    );
  }
}

AlbumCard.propTypes = {
  album: PropTypes.shape().isRequired,
};

export default AlbumCard;
