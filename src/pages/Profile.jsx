import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';

class Profile extends Component {
  state = {
    name: '',
    email: '',
    image: '',
    description: '',
    loadingUser: false,
  };

  componentDidMount() {
    this.fetchUser();
  }

  fetchUser = async () => {
    this.setState(
      { loadingUser: true },
      async () => {
        const user = await getUser();
        const { name, email, image, description } = user;
        this.setState({ name, email, image, description }, () => {
          this.setState({ loadingUser: false });
        });
      },
    );
  };

  render() {
    const { name, email, image, description, loadingUser } = this.state;
    const userActual = (
      <div>
        <h2>{ name }</h2>
        <h3>{ email }</h3>
        <p>{ description }</p>
        <img src={ image } alt="sua imagem" data-testid="profile-image" />
      </div>
    );
    return (
      <div data-testid="page-profile">
        <Header />
        { loadingUser ? <Loading /> : userActual }
        <Link to="/profile/edit" data-testid="link-to-profile">Editar perfil</Link>
      </div>
    );
  }
}

export default Profile;
