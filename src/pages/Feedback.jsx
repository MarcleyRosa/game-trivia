import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import md5 from 'crypto-js/md5';
import Header from '../components/Header';
import { rankingAction, resetScoreAction } from '../redux/actions';

class Feedback extends Component {
  state = {
    shouldRedirect: false,
  };

  componentDidMount() {
    this.savePlayersInfo();
  }

  savePlayersInfo = () => {
    const { name, gravatarEmail, score } = this.props;
    const { dispatch } = this.props;
    const picture = `https://www.gravatar.com/avatar/${md5(gravatarEmail).toString()}`;
    dispatch(rankingAction(name, picture, score));
  };

  onClick = () => {
    const { dispatch } = this.props;
    dispatch(resetScoreAction());
    this.setState({ shouldRedirect: true });
  };

  handleRankingButtonClick = () => {
    const { history } = this.props;
    history.push('/ranking');
  };

  render() {
    const { score, assertions } = this.props;
    const { shouldRedirect } = this.state;
    const correctAnswers = 3;
    return (
      <div>
        Feedback
        <Header />
        { assertions < correctAnswers
          ? <p data-testid="feedback-text">Could be better...</p>
          : <p data-testid="feedback-text">Well Done!</p>}
        <p data-testid="feedback-total-score">{ score }</p>
        <p data-testid="feedback-total-question">{ assertions }</p>
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ this.onClick }
        >
          Play Again
        </button>
        <button
          onClick={ this.handleRankingButtonClick }
          type="button"
          data-testid="btn-ranking"
        >
          Ranking
        </button>
        { shouldRedirect && <Redirect to="/" /> }
      </div>
    );
  }
}

Feedback.propTypes = {
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
  history: PropTypes.shape([PropTypes.object]).isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  score: state.player.score,
  assertions: state.player.assertions,
  gravatarEmail: state.player.gravatarEmail,
  name: state.player.name,
});

export default connect(mapStateToProps, null)(Feedback);
