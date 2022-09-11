import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Test component Login', () => {
    it('Test inputs and button ', async () => {

        // const mockData = {
        //     response_code: 0,
        //     response_message: 'Token Generated Successfully!',
        //     token: 'e9623a0d396d372d804165ef5c4e159d04387c89e3571135b7695671056cf5bb'
        // }

        renderWithRouterAndRedux(<App />)

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

        userEvent.click(buttonGame);

    })
    it('Test button game and route', async () => {
        const { history } = renderWithRouterAndRedux(<App />);

        const buttonSettings = screen.getByRole('button', { name: 'Configurações' })

        expect(buttonSettings).toBeInTheDocument();

        userEvent.click(buttonSettings);

        expect(history.location.pathname).toBe('/settings')
    })
})