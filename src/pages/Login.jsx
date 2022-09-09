import React, { Component } from 'react';
import PropTypes from 'prop-types';
import getToken from '../fetchAPI';

class Login extends Component {
  state = {
    player: '',
    playerEmail: '',
    isDisabled: true,
    token: '',
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, () => {
      const { player, playerEmail } = this.state;
      if (player && playerEmail) {
        this.setState({ isDisabled: false });
      } else {
        this.setState({
          isDisabled: true,
        });
      }
    });
  };

  handleClick = async () => {
    const tokenInfos = await getToken();
    const { token } = tokenInfos;

    localStorage.setItem('token', token);

    const { history } = this.props;
    this.setState({
      token,
    }, () => {
      history.push('/game');
    });
  };

  render() {
    const { player, playerEmail, isDisabled, token } = this.state;
    console.log(token);
    return (
      <form>
        <label htmlFor="player">
          <input
            placeholder="insira seu nome"
            type="text"
            name="player"
            id="player"
            value={ player }
            data-testid="input-player-name"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="playerEmail">
          <input
            placeholder="insira seu email"
            type="email"
            name="playerEmail"
            id="playerEmail"
            value={ playerEmail }
            data-testid="input-gravatar-email"
            onChange={ this.handleChange }
          />
        </label>
        <button
          type="button"
          disabled={ isDisabled }
          data-testid="btn-play"
          onClick={ this.handleClick }
        >
          Play
        </button>
      </form>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape([PropTypes.object]).isRequired,
};

export default Login;
