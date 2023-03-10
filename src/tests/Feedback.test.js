import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const stateWith3Assertions = {
  player: {
    name: 'José',
    assertions: 3,
    score: 140,
    gravatarEmail: 'jose@trybe.com',
    ranking: [],
  }
}

const statestateWith2Assertions = {
  player: {
    name: 'José',
    assertions: 2,
    score: 140,
    gravatarEmail: 'jose@trybe.com',
    ranking: [],
  }
}

describe('Test component Feedback', () => {
  it('Tests the current url', () => {
    const { history } = renderWithRouterAndRedux(<App />, stateWith3Assertions, '/feedback');
    expect(history.location.pathname).toBe('/feedback');
  });

  it('Tests if the correct quantity of answers is showed on screen', () => {
    renderWithRouterAndRedux(<App />, stateWith3Assertions, '/feedback');
    const assertions = screen.getByTestId("feedback-total-question");
    expect(assertions).toBeInTheDocument();
    expect(assertions).toHaveTextContent(3);
  });

  it('Tests if correct message is showed when the player had 3 or more assertions', () => {
    renderWithRouterAndRedux(<App />, stateWith3Assertions, '/feedback');
    const message = screen.getByTestId("feedback-text");
    expect(message).toHaveTextContent("Well Done!");
  });

  it('Tests if correct message is showed when the player had 3 or more assertions', () => {
    renderWithRouterAndRedux(<App />, statestateWith2Assertions, '/feedback');
    const message = screen.getByTestId("feedback-text");
    expect(message).toHaveTextContent("Could be better...");
  });
  it('Tests the play again button', () => {
    const { history } = renderWithRouterAndRedux(<App />, statestateWith2Assertions, '/feedback');
    const buttonPlayAgain = screen.getByRole('button', { name: /play again/i });
    expect(buttonPlayAgain).toBeInTheDocument();

    userEvent.click(buttonPlayAgain);

    expect(history.location.pathname).toBe('/');
  });

  it('Tests the ranking button', () => {
    const { history } = renderWithRouterAndRedux(<App />, statestateWith2Assertions, '/feedback');
    const buttonRanking = screen.getByRole('button', { name: /ranking/i });
    expect(buttonRanking).toBeInTheDocument();

    userEvent.click(buttonRanking);

    expect(history.location.pathname).toBe('/ranking');
  });
});