import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import MusicCard from '../components/MusicCard';

class Favorites extends Component {
  state = {
    favoriteList: [],
    loadingFavoriteList: false,
  };

  componentDidMount() {
    this.fetchFavorites();
  }

  handleChange = ({ target }, songInfo) => {
    const { name, checked } = target;
    this.setState(
      {
        [name]: checked,
      },
      () => {
        if (checked) {
          this.addFavorite(songInfo);
        } else {
          this.removeFavorite(songInfo);
        }
      },
    );
  };

  removeFavorite = async (songInfo) => {
    this.setState(
      { loadingFavoriteList: true },
      async () => {
        await removeSong(songInfo);
        await this.fetchFavorites();
      },
    );
  };

  fetchFavorites = async () => {
    this.setState(
      { loadingFavoriteList: true },
      async () => {
        const favoriteList = await getFavoriteSongs();
        const indexTrue = favoriteList.map(() => true);
        this.setState({ ...indexTrue, favoriteList }, () => {
          this.setState({ loadingFavoriteList: false });
        });
      },
    );
  };

  render() {
    const { favoriteList, loadingFavoriteList } = this.state;
    const { state } = this;
    return (
      <div data-testid="page-favorites">
        <Header />
        { loadingFavoriteList ? <Loading /> : favoriteList.map((e, index) => (
          <MusicCard
            key={ e.trackId }
            songInfo={ e }
            index={ index }
            checked={ state[index] }
            handleChange={ this.handleChange }
          />))}
      </div>
    );
  }
}

export default Favorites;
