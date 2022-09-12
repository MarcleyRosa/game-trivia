import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import '../App.css';
import getQuestions from '../fetchQuestions';
import { assertionsAction, scoreAction } from '../redux/actions';

class Game extends Component {
  state = {
    questions: [],
    indexClick: 0,
    isAnswered: false,
    scrambledQuestions: [0],
    timeCount: 30,
    isDisabled: false,
    numberInterval: 0,
    correctQuestions: 0,
  };

  async componentDidMount() {
    const token = localStorage.getItem('token');
    const questions = await getQuestions(token);
    this.setState({ questions: questions.results }, () => {
      this.scrambledQuest();
    });
    const limitTime = 3;
    if (questions.response_code === limitTime) {
      localStorage.removeItem('token');
      const { history } = this.props;
      history.push('/');
    }
    this.timeQuestion();
  }

  handleQuest = () => {
    this.clearTimeInterval();
    this.setState((prevState) => ({
      indexClick: prevState.indexClick + 1,
      isAnswered: false,
      timeCount: 30,
      isDisabled: false,
    }), () => {
      this.scrambledQuest();
    });
    const { indexClick, correctQuestions } = this.state;
    const { history, resultAssertion } = this.props;
    const maxNumberQuestion = 4;
    if (indexClick === maxNumberQuestion) {
      this.setState({
        indexClick: 0,

      });
      resultAssertion(correctQuestions);
      history.push('/feedback');
    }
    this.timeQuestion();
  };

  scrambledQuest = () => {
    const { questions } = this.state;
    const scrambled = questions
      .map((quest) => [...quest.incorrect_answers, quest.correct_answer])
      .map((rand) => this.shuffleArray(rand));

    this.setState({
      scrambledQuestions: scrambled,
    });
  };

  shuffleArray = (arr) => {
    for (let i = arr.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  clearTimeInterval = () => {
    const { numberInterval } = this.state;
    clearInterval(numberInterval);

    this.setState({
      isDisabled: true,
    });
  };

  chosenQuestion = ({ target }) => {
    const { timeCount, questions, indexClick } = this.state;
    const { resultScore } = this.props;

    this.clearTimeInterval();
    this.setState({
      isAnswered: true,
    }, () => {
      const pointFix = 10;
      const hard = 3;
      const medium = 2;
      const easy = 1;

      if (target.className === 'correct') {
        switch (questions[indexClick].difficulty) {
        case 'hard': {
          const result = pointFix + (timeCount * hard);
          resultScore(result);
          break;
        }
        case 'medium': {
          const result = pointFix + (timeCount * medium);
          resultScore(result);
          break;
        }
        case 'easy': {
          const result = pointFix + (timeCount * easy);
          resultScore(result);
          break;
        }
        default: return pointFix + (timeCount * easy);
        }
        this.setState((prevState) => ({
          correctQuestions: prevState.correctQuestions + 1,
        }));
      }
    });
  };

  identifyCorrect = (index, correct, wrong) => {
    const { questions, indexClick, scrambledQuestions } = this.state;
    return (questions[indexClick].correct_answer
       === scrambledQuestions[indexClick][index] ? correct : wrong);
  };

  timeQuestion = () => {
    const timeMaxQuestion = 30;
    const timeInterval = 1000;

    let count = timeMaxQuestion;

    const interval = setInterval(() => {
      count -= 1;
      if (count === 0) {
        clearInterval(interval);
        this.setState({
          isDisabled: true,
        });
      }

      this.setState({
        timeCount: count,
      });
    }, timeInterval);
    this.setState({
      numberInterval: interval,
    });
  };

  handleRankingButtonClick = () => {
    const { history } = this.props;
    history.push('/ranking');
  };

  render() {
    const { player, score, email } = this.props;
    const { questions, indexClick, isAnswered,
      scrambledQuestions, timeCount, isDisabled } = this.state;

    const hash = md5(email).toString();

    return (
      <div>
        <img src={ `https://www.gravatar.com/avatar/${hash}` } alt="player" data-testid="header-profile-picture" />
        <p data-testid="header-player-name">{`Olá, ${player}`}</p>
        <p data-testid="header-score">{`Placar: ${score}`}</p>
        {questions.length !== 0 ? (
          <div>
            <p data-testid="question-category">{questions[indexClick].category}</p>
            <p data-testid="question-text">{questions[indexClick].question}</p>
            <p>{ timeCount }</p>
            <div data-testid="answer-options">

              { questions.map((quest, index) => (
                index < scrambledQuestions[indexClick].length && (
                  <button
                    key={ quest.question }
                    onClick={ this.chosenQuestion }
                    disabled={ isDisabled }
                    className={ isAnswered
                      ? this.identifyCorrect(index, 'correct', 'wrong') : 'test' }
                    type="button"
                    data-testid={
                      this
                        .identifyCorrect(index, 'correct-answer', `wrong-answer-${index}`)
                    }
                  >
                    {scrambledQuestions[indexClick][index]}
                  </button>
                )
              ))}
            </div>
            { isAnswered && (
              <button
                onClick={ this.handleQuest }
                data-testid="btn-next"
                type="button"
              >
                Next

              </button>)}
            <button
              onClick={ this.handleRankingButtonClick }
              type="button"
              data-testid="btn-ranking"
            >
              Ranking
            </button>
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
  resultScore: PropTypes.func.isRequired,
  resultAssertion: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  player: state.player.name,
  score: state.player.score,
  email: state.player.gravatarEmail,
});

const mapDispatchToProps = (dispatch) => ({
  resultScore: (state) => dispatch(scoreAction(state)),
  resultAssertion: (state) => dispatch(assertionsAction(state)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
