import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import getQuestions from '../fetchQuestions';

class Game extends Component {
  state = {
    questions: [],
    indexClick: 0,

  };

  async componentDidMount() {
    const token = localStorage.getItem('token');
    const questions = await getQuestions(token);
    this.setState({ questions: questions.results });
    const limitTime = 3;
    if (questions.response_code === limitTime) {
      localStorage.removeItem('token');
      const { history } = this.props;
      history.push('/');
    }
  }

  handleQuest = () => {
    this.setState((prevState) => ({
      indexClick: prevState.indexClick + 1,
    }));
    const { indexClick } = this.state;
    const maxNumberQuestion = 4;
    if (indexClick === maxNumberQuestion) {
      this.setState({
        indexClick: 0,
      });
    }
  };

  shuffleArray = (arr) => {
    for (let i = arr.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  render() {
    const { player, score, email } = this.props;
    const { questions, indexClick } = this.state;
    const hash = md5(email).toString();

    const randQuestions = questions
      .map((quest) => [...quest.incorrect_answers, quest.correct_answer])
      .map((rand) => this.shuffleArray(rand));

    return (
      <div>
        <img src={ `https://www.gravatar.com/avatar/${hash}` } alt="player" data-testid="header-profile-picture" />
        <p data-testid="header-player-name">{`Olá, ${player}`}</p>
        <p data-testid="header-score">{`Placar: ${score}`}</p>
        {questions.length !== 0 ? (
          <div>
            <p data-testid="question-category">{questions[indexClick].category}</p>
            <p data-testid="question-text">{questions[indexClick].question}</p>
            <div data-testid="answer-options">

              { questions.map((quest, index) => (
                index < randQuestions[indexClick].length && (
                  <button
                    key={ quest.question }
                    type="button"
                    data-testid={ questions[indexClick].correct_answer
                   === randQuestions[indexClick][index]
                      ? 'correct-answer' : `wrong-answer-${index}` }
                  >
                    {randQuestions[indexClick][index]}
                  </button>
                )
              ))}
            </div>
            <button onClick={ this.handleQuest } type="button">Next</button>
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
