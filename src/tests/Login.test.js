import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Test component Login', () => {
    it('Test inputs and button ', async () => {
        const { history } = renderWithRouterAndRedux(<App />);

        const email = 'test@jest.com'
        const name = 'First Player'

        const inputName = screen.getByPlaceholderText('insira seu nome');
        const inputEmail = screen.getByPlaceholderText('insira seu email');

        expect(inputName).toBeInTheDocument();
        expect(inputEmail).toBeInTheDocument();

        userEvent.type(inputName, name);
        userEvent.type(inputEmail, email);

        const buttonGame = screen.getByRole('button', { name: 'Play' })

        expect(buttonGame).toBeInTheDocument();

        expect(history.location.pathname).toBe('/');
        userEvent.click(buttonGame);

        await waitFor( () => expect(history.location.pathname).toBe('/game'));
    })
    it('Test button game and route', async () => {
        const { history } = renderWithRouterAndRedux(<App />);

        const buttonSettings = screen.getByRole('button', { name: 'Configurações' })

        expect(buttonSettings).toBeInTheDocument();

        userEvent.click(buttonSettings);

        expect(history.location.pathname).toBe('/settings')

        const buttonBack = screen.getByRole('button', { name: 'Voltar'})

        expect(buttonBack).toBeInTheDocument();

        userEvent.click(buttonBack);
    });
})