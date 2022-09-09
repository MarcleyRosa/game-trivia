import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { loginAction } from '../redux/actions';


class Login extends Component {
  state = {
    player: '',
    playerEmail: '',
    isDisabled: true,
    shouldRedirect: false,
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


  onButtonClick = () => {
    const { player } = this.state;
    const { logPlayer } = this.props;
    logPlayer(player, playerEmail);
    this.setState({
      shouldRedirect: true,
    });

  goToSettings = () => {
    const { history } = this.props;
    history.push('/configurações');
  };

  render() {
    const { player, playerEmail, isDisabled, shouldRedirect } = this.state;
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
          onClick={ this.onButtonClick }
        >
          Play
        </button>
        {shouldRedirect && <Redirect to="/game" />}
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
  logPlayer: PropTypes.func.isRequired,
  history: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  logPlayer: (player) => dispatch(loginAction(player, playerEmail)),
});

export default connect(null, mapDispatchToProps)(Login);
