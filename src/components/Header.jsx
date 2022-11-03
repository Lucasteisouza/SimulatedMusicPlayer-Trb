import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends Component {
  state = {
    name: '',
    loadingName: false,
  };

  componentDidMount() {
    this.fetchUser();
  }

  fetchUser = async () => {
    this.setState(
      { loadingName: true },
      async () => {
        const userData = await getUser();
        this.setState({ name: userData.name });
        this.setState({ loadingName: false });
      },
    );
  };

  render() {
    const { name, loadingName } = this.state;
    return (
      <header data-testid="header-component">
        <h3 data-testid="header-user-name">
          { (loadingName) ? <Loading /> : name }
        </h3>
        <Link to="/search" data-testid="link-to-search">Buscar</Link>
        <Link to="/favorites" data-testid="link-to-favorites">Favoritas</Link>
        <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
      </header>
    );
  }
}

export default Header;
