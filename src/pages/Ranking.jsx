import React, { Component } from 'react';
import { string } from 'prop-types';
import { connect } from 'react-redux';
import { resetScoreAction } from '../redux/actions';

class Ranking extends Component {
  state = {
    ranking: [],
  };

  componentDidMount() {
    this.getRanking();
  }

  getRanking = () => {
    const { ranking } = this.props;
    this.setState({ ranking });
    const token = localStorage.getItem('token');
    const rankingInfos = {
      ranking,
      token,
    };
    localStorage.setItem('rankingInfos', JSON.stringify(rankingInfos));
  };

  handleClick = () => {
    const { history, dispatch } = this.props;
    dispatch(resetScoreAction());
    history.push('/');
  };

  render() {
    const { ranking } = this.state;
    return (
      <section>
        <h1 data-testid="ranking-title">Ranking</h1>
        {
          ranking.map((player, index) => (
            <section key={ index }>
              <img src={ player.picture } alt="gravatarImage" />
              <p data-testid={ `player-name-${index}` }>{player.name}</p>
              <p data-testid={ `player-score-${index}` }>{Number(player.score)}</p>
            </section>
          ))
        }
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ this.handleClick }
        >
          Login
        </button>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  ranking: state.player.ranking,
});

Ranking.propTypes = {
  history: string.isRequired,
}.isRequired;

export default connect(mapStateToProps)(Ranking);
