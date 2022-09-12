import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Test component Feedback', () => {
  test('', () => {
    const state = {
      name: 'José',
      assertions: 3,
      score: 140,
      gravatarEmail: 'jose@trybe.com',
    }
    const { history } = renderWithRouterAndRedux(<App />, { initialState: state, route: '/feedback' });
    expect(history.location.pathname).toBe('/feedback');

    const assertions = screen.getByTestId("feedback-total-question");
    expect(assertions).toBeInTheDocument();
    expect(assertions).toHaveTextContent(0); // Precisa atualizar o contador de acertos totais, o 0 deve ser substituído pelo valor da chave "assertions"

  });
});