import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';

class Album extends Component {
  state = {
    loadingAlbum: false,
    albumData: [{ artistName: '' }],
  };

  componentDidMount() {
    this.fetchMusic();
  }

  handleChange({ target }) {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    });
  }

  fetchMusic = async () => {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    this.setState(
      { loadingAlbum: true },
      async () => {
        const albumData = await getMusics(id);
        this.setState(
          { albumData },
          this.setState({ loadingAlbum: false }),
        );
      },
    );
  };

  render() {
    const { albumData, loadingAlbum } = this.state;
    const requestHeader = albumData[0];
    const albumHeader = (
      <div>
        <h3 data-testid="artist-name">{ requestHeader.artistName }</h3>
        <h4 data-testid="album-name">{ requestHeader.collectionName }</h4>
      </div>
    );
    const slicedAlbumData = albumData.slice(1);

    return (
      <div data-testid="page-album">
        <Header />
        { loadingAlbum ? <Loading /> : albumHeader}
        {loadingAlbum ? <Loading /> : slicedAlbumData.map((e) => (
          <MusicCard
            key={ e.trackId }
            songInfo={ e }
            handleChange={ this.handleChange }
          />))}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape().isRequired,
};

export default Album;
