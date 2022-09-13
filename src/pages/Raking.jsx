import { Component } from 'react';
import PropTypes from 'prop-types';

class Ranking extends Component {
  handleClick = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    return (
      <div>
        <p data-testid="ranking-title">Ranking</p>
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ this.handleClick }
        >
          Login
        </button>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape([PropTypes.object]).isRequired,
};

export default Ranking;
