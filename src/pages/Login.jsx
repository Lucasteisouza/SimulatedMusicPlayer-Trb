import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Loading from '../components/Loading';
import { createUser } from '../services/userAPI';

class Login extends Component {
  state = {
    userName: '',
    isEntrarDisabled: true,
    loading: false,
    logged: false,
  };

  entrarClickHandler = () => {
    this.fetchUserData();
  };

  fetchUserData = async () => {
    const { userName } = this.state;
    this.setState(
      { loading: true },
      async () => {
        await createUser({ name: userName });
        this.setState({ loading: false, logged: true });
      },
    );
  };

  inputHandler = ({ target }) => {
    const minCharacterLimit = 3;
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
    if (value.length >= minCharacterLimit) {
      this.setState({ isEntrarDisabled: false });
    } else {
      this.setState({ isEntrarDisabled: true });
    }
  };

  render() {
    const { isEntrarDisabled, loading, logged } = this.state;
    return (
      <div data-testid="page-login">
        <form>
          <label htmlFor="userName">
            <input
              type="text"
              name="userName"
              id="userName"
              onChange={ this.inputHandler }
              data-testid="login-name-input"
            />
          </label>
          <button
            type="button"
            disabled={ isEntrarDisabled }
            onClick={ this.entrarClickHandler }
            data-testid="login-submit-button"
          >
            Entrar
          </button>
        </form>
        { (loading) ? <Loading /> : null}
        { (logged) && <Redirect to="/search" />}
      </div>
    );
  }
}

export default Login;
