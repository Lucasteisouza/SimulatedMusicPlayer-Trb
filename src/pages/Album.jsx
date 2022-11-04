import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';
import { addSong } from '../services/favoriteSongsAPI';

class Album extends Component {
  state = {
    loadingAlbum: false,
    albumData: [{ artistName: '' }],
    loadingFavorite: false,
  };

  componentDidMount() {
    this.fetchAlbums();
  }

  addFavorite = async (songInfo) => {
    this.setState(
      { loadingFavorite: true },
      async () => {
        await addSong(songInfo);
        this.setState({ loadingFavorite: false });
      },
    );
  };

  fetchAlbums = async () => {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    this.setState(
      { loadingAlbum: true },
      async () => {
        const albumData = await getMusics(id);
        const slicedAlbumData = albumData.slice(1);
        const trackIdArr = slicedAlbumData.map(() => false);
        this.setState(
          { ...trackIdArr, albumData },
          this.setState({ loadingAlbum: false }),
        );
      },
    );
  };

  handleChange = ({ target }, songInfo) => {
    const { name, checked } = target;
    this.setState(
      {
        [name]: checked,
      },
      () => {
        if (checked) {
          this.addFavorite(songInfo);
        }
      },
    );
  };

  render() {
    const { albumData, loadingAlbum, loadingFavorite } = this.state;
    const requestHeader = albumData[0];
    const albumHeader = (
      <div>
        <h3 data-testid="artist-name">{ requestHeader.artistName }</h3>
        <h4 data-testid="album-name">{ requestHeader.collectionName }</h4>
      </div>
    );
    const sliced = albumData.slice(1);
    const { state } = this;

    return (
      <div data-testid="page-album">
        <Header />
        { (loadingAlbum) ? <Loading /> : albumHeader}
        { (loadingAlbum || loadingFavorite) ? <Loading /> : sliced.map((e, index) => (
          <MusicCard
            key={ e.trackId }
            songInfo={ e }
            handleChange={ this.handleChange }
            addFavorite={ this.addFavorite }
            index={ index }
            checked={ state[index] }
          />))}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape().isRequired,
};

export default Album;
