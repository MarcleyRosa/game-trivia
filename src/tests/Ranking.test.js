import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Test component Ranking', () => {
  it('tests if it contains an image on the screen', () => {
    const initialState = {
      player: {
        name: 'Lucas',
        assertions: 3,
        score: 120,
        gravatarEmail: 'asdadd@test.com',
        ranking: [
          {
            name: 'Lucas',
            picture: 'https://www.gravatar.com/avatar/8c1888d2961a46be42bdb63e8fa55d7b',
            score: 120
          }
        ],
      }
    };

    renderWithRouterAndRedux(<App />, initialState, "/ranking");

    const gravatarImage = screen.getByRole('img', { name: /gravatarImage/i });
    expect(gravatarImage).toBeInTheDocument();
  });
  it('tests if it contains a title and a button on the screen', () => {
    const initialState = {
      player: {
        name: 'Lucas',
        assertions: 3,
        score: 120,
        gravatarEmail: 'asdadd@test.com',
        ranking: [
          {
            name: 'Lucas',
            picture: 'https://www.gravatar.com/avatar/8c1888d2961a46be42bdb63e8fa55d7b',
            score: 120
          }
        ],
      }
    };

    renderWithRouterAndRedux(<App />, initialState, "/ranking");

    const rankingTitle = screen.getByTestId(/ranking-title/i);
    const rankingButton = screen.getByTestId(/btn-go-home/i);
    expect(rankingTitle).toBeInTheDocument();
    expect(rankingButton).toBeInTheDocument();
  });
  it('test button functionality', () => {
    const initialState = {
      player: {
        name: 'Lucas',
        assertions: 3,
        score: 120,
        gravatarEmail: 'asdadd@test.com',
        ranking: [
          {
            name: 'Lucas',
            picture: 'https://www.gravatar.com/avatar/8c1888d2961a46be42bdb63e8fa55d7b',
            score: 120
          }
        ],
      }
    };

    const { history, store } = renderWithRouterAndRedux(<App />, initialState, "/ranking");

    const rankingButton = screen.getByTestId(/btn-go-home/i);
    expect(rankingButton).toBeInTheDocument();
    userEvent.click(rankingButton);
    const { player } = store.getState();
    expect(player.score).toBe(0);
    expect(history.location.pathname).toBe('/');
  });
});
