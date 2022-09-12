import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';

class Header extends Component {
  render() {
    const { player, score, email } = this.props;
    const hash = md5(email).toString();
    return (
      <div>
        <img src={ `https://www.gravatar.com/avatar/${hash}` } alt="player" data-testid="header-profile-picture" />
        <p data-testid="header-player-name">{`Olá, ${player}`}</p>
        <p data-testid="header-score">{`Placar: ${score}`}</p>
      </div>
    );
  }
}

Header.propTypes = {
  player: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  email: PropTypes.string.isRequired,
  // history: PropTypes.shape([PropTypes.object]).isRequired,

};

const mapStateToProps = (state) => ({
  player: state.player.name,
  score: state.player.score,
  email: state.player.gravatarEmail,
});

export default connect(mapStateToProps, null)(Header);
