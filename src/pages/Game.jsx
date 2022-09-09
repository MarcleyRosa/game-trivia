import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import getQuestions from '../fetchQuestions';

class Game extends Component {
  state = {
    questions: [],
    index: 0,

  };

  async componentDidMount() {
    const token = localStorage.getItem('token');
    const questions = await getQuestions(token);
    console.log(questions.results);
    console.log(token);
    this.setState({ questions: questions.results });
    const limitTime = 3;
    if (questions.response_code === limitTime) {
      localStorage.removeItem('token');
      const { history } = this.props;
      history.push('/');
    }
  }

  render() {
    const { player, score, email } = this.props;
    const { questions, index } = this.state;
    console.log(questions);
    const hash = md5(email).toString();
    return (
      <div>
        <img src={ `https://www.gravatar.com/avatar/${hash}` } alt="player" data-testid="header-profile-picture" />
        <p data-testid="header-player-name">{`Olá, ${player}`}</p>
        <p data-testid="header-score">{`Placar: ${score}`}</p>
        {questions.length !== 0 ? (
          <div>
            <p>{questions[0].category}</p>
            <p>{questions[0].question}</p>
            <button type="button">{questions[0].incorrect_answers}</button>
            <button type="button">{questions[0].incorrect_answers}</button>
            <button type="button">{questions[0].incorrect_answers}</button>
            <button type="button">{questions[0].correct_answer}</button>
            <button type="button">enviar resposta</button>
          </div>

        ) : (<p>Loading</p>)}

      </div>
    );
  }
}

Game.propTypes = {
  player: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  email: PropTypes.string.isRequired,
  history: PropTypes.shape([PropTypes.object]).isRequired,

};

const mapStateToProps = (state) => ({
  player: state.player.name,
  score: state.player.score,
  email: state.player.gravatarEmail,
});

export default connect(mapStateToProps, null)(Game);
