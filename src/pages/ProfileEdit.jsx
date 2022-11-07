import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { getUser, updateUser } from '../services/userAPI';
import Loading from '../components/Loading';

class ProfileEdit extends Component {
  state = {
    name: '',
    email: '',
    image: '',
    description: '',
    loadingUser: false,
    isSaveDisabled: true,
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

  userUpdater = async () => {
    const { name, email, description, image } = this.state;
    this.setState(
      { loadingUser: true },
      async () => {
        const user = { name, email, description, image };
        await updateUser(user);
        this.setState({ loadingUser: false });
        const { history } = this.props;
        const { push } = history;
        push('/profile');
      },
    );
  };

  submitHandler = () => {
    this.userUpdater();
  };

  changeHandler = ({ target }) => {
    const { name, value } = target;
    const { email, description, image } = this.state;
    const { state } = this;
    this.setState({ [name]: value });
    const userNam = state.name;
    if (userNam.length > 0
      && email.length > 0
      && description.length > 0
      && image.length > 0
      && email.includes('@')
    ) {
      this.setState({ isSaveDisabled: false });
    } else {
      this.setState({ isSaveDisabled: true });
    }
  };

  render() {
    const { loadingUser, name, email, description, image, isSaveDisabled } = this.state;
    const form = (
      <div data-testid="page-profile-edit">
        <form>
          <label htmlFor="name">
            Nome:
            <input
              type="text"
              data-testid="edit-input-name"
              onChange={ this.changeHandler }
              name="name"
              id="name"
              value={ name }
            />
          </label>
          <label htmlFor="email">
            Email:
            <input
              type="text"
              data-testid="edit-input-email"
              onChange={ this.changeHandler }
              name="email"
              id="email"
              value={ email }
            />
          </label>
          <label htmlFor="description">
            Descrição:
            <input
              type="text"
              data-testid="edit-input-description"
              onChange={ this.changeHandler }
              name="description"
              id="description"
              value={ description }
            />
          </label>
          <label htmlFor="image">
            Imagem:
            <input
              type="text"
              data-testid="edit-input-image"
              onChange={ this.changeHandler }
              name="image"
              id="image"
              value={ image }
            />
          </label>
          <button
            type="button"
            data-testid="edit-button-save"
            onClick={ this.submitHandler }
            disabled={ isSaveDisabled }
          >
            Salvar
          </button>
        </form>
      </div>
    );

    return (
      <div>
        <Header />
        { loadingUser ? <Loading /> : form }
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default ProfileEdit;
