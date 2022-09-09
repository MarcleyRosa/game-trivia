import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Login extends Component {
  state = {
    player: '',
    playerEmail: '',
    isDisabled: true,
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, () => {
      const { player, playerEmail } = this.state;
      if (player && playerEmail) {
        this.setState({ isDisabled: false });
      } else {
        this.setState({ isDisabled: true });
      }
    });
  };

  goToSettings = () => {
    const { history } = this.props;
    history.push('/configurações');
  };

  render() {
    const { player, playerEmail, isDisabled } = this.state;
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
        >
          Play
        </button>
        <button
          type="button"
          data-testid="btn-settings"
          onClick={ this.goToSettings }
        >
          Configurações
        </button>
      </form>
    );
  }
}

Login.propTypes = {
  history: PropTypes.func.isRequired,
};

export default Login;
