import React, { Component } from 'react';
import AlbumCard from '../components/AlbumCard';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends Component {
  state = {
    artist: '',
    isSearchDisabled: true,
    albumsArr: [],
    loading: false,
    showArtistSearch: false,
    savedArtist: '',
  };

  fetchAlbums = async () => {
    const { artist } = this.state;
    this.setState(
      { loading: true },
      async () => {
        const requestReturn = await searchAlbumsAPI(artist);
        this.setState({ albumsArr: requestReturn, loading: false });
      },
    );
  };

  inputChangeHandler = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
    if (value.length >= 2) {
      this.setState({ isSearchDisabled: false });
    } else {
      this.setState({ isSearchDisabled: true });
    }
  };

  searchClickHandler = () => {
    const { artist } = this.state;
    this.setState({ savedArtist: artist, showArtistSearch: true });
    this.fetchAlbums();
    this.setState({ artist: '' });
  };

  render() {
    const { isSearchDisabled,
      loading,
      albumsArr,
      showArtistSearch,
      savedArtist } = this.state;
    const mapedArr = albumsArr.map((element) => (
      <AlbumCard
        key={ element.collectionId }
        album={ element }
      />));

    const showOrNot = (
      <ul>
        { (albumsArr.length === 0)
          ? <p>Nenhum álbum foi encontrado</p>
          : mapedArr }
      </ul>);

    const restOfPage = (
      <div>
        <form>
          <label htmlFor="artist">
            <input
              type="text"
              name="artist"
              id="artist"
              onChange={ this.inputChangeHandler }
              data-testid="search-artist-input"
            />
          </label>
          <button
            type="button"
            disabled={ isSearchDisabled }
            data-testid="search-artist-button"
            onClick={ this.searchClickHandler }
          >
            Pesquisar
          </button>
        </form>
        {showArtistSearch && `Resultado de álbuns de: ${savedArtist}`}
        {showArtistSearch && showOrNot}
      </div>
    );
    return (
      <div data-testid="page-search">
        <Header />
        { (loading) ? <Loading /> : restOfPage }
      </div>
    );
  }
}

export default Search;
