import App from "../App"
import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux"
import { screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from "@testing-library/user-event";

const questionsData = {
    "response_code": 0,
    "results": [
        {
            "category": "General Knowledge",
            "type": "boolean",
            "difficulty": "medium",
            "question": "The word &quot;news&quot; originates from the first letters of the 4 main directions on a compass (North, East, West, South).",
            "correct_answer": "False",
            "incorrect_answers": [
                "True"
            ]
        },
        {
            "category": "Entertainment: Japanese Anime & Manga",
            "type": "multiple",
            "difficulty": "easy",
            "question": "What is the last name of Edward and Alphonse in the Fullmetal Alchemist series.",
            "correct_answer": "Elric",
            "incorrect_answers": [
                "Ellis",
                "Eliek",
                "Elwood"
            ]
        },
        {
            "category": "Sports",
            "type": "multiple",
            "difficulty": "easy",
            "question": "In Baseball, how many times does the ball have to be pitched outside of the strike zone before the batter is walked?",
            "correct_answer": "4",
            "incorrect_answers": [
                "1",
                "2",
                "3"
            ]
        },
        {
            "category": "Entertainment: Television",
            "type": "boolean",
            "difficulty": "easy",
            "question": "In Battlestar Galactica (2004), Cylons were created by man as cybernetic workers and soldiers.",
            "correct_answer": "True",
            "incorrect_answers": [
                "False"
            ]
        },
        {
            "category": "Entertainment: Video Games",
            "type": "multiple",
            "difficulty": "hard",
            "question": "How many partners can you obtain in Paper Mario: The Thousand-Year Door?",
            "correct_answer": "7",
            "incorrect_answers": [
                "6",
                "9",
                "10"
            ]
        }
    ]
}

  const dataQuestions = {
    response_code:0,
    results: questionsData
  }
  const initialState = {
    player: {
      name: 'player',
      assertions: 0,
      score: 0,
      gravatarEmail: 'player@player.com',
      ranking: [],
    }
  } 

describe('Tests component Game.jsx', () => {

    jest.setTimeout(38000)
    beforeEach(() => {
        global.fetch = jest.fn(async () => Promise.resolve({
            json: async () => Promise.resolve(questionsData),
        }));
    })
    it('Tests info player and questions', async () => {
        const { history } = renderWithRouterAndRedux(<App />, initialState, '/game')
        const loading = screen.getByText('Loading!')
        await waitForElementToBeRemoved(loading);

        expect(history.location.pathname).toBe('/game')

        const playerName = screen.getByText('Olá, player');

        const textQuestion = screen.getByText('General Knowledge')

        const textPlacar = screen.getByText('Placar: 0');

        expect(textPlacar).toBeInTheDocument();

        expect(textQuestion).toBeInTheDocument();
        expect(playerName).toBeInTheDocument();

        const buttonQuestion = screen.getByRole('button', { name: 'True' })

        expect(buttonQuestion).toBeInTheDocument();

        userEvent.click(buttonQuestion)

        const buttonNext = screen.getByRole('button', { name: 'Next' })

        expect(buttonNext).toBeInTheDocument();

        await waitFor(() => expect(global.fetch).toBeCalledTimes(1));
        // await waitFor(() => expect(global.fetch).toBeCalledWith(`https://opentdb.com/api.php?amount=5&token=${token}`));

        userEvent.click(buttonNext);
    })
    it('Test button ranking and route', async () => {
        const { history } = renderWithRouterAndRedux(<App />, initialState, '/game')
        const loading = screen.getByText('Loading!')
        await waitForElementToBeRemoved(loading);

        const buttonRanking = screen.getByRole('button', { name: 'Ranking'})

        expect(buttonRanking).toBeInTheDocument();

        userEvent.click(buttonRanking);

        expect(history.location.pathname).toBe('/ranking')

    })
    it('Tests correct questions button', async () => {
        const { history } = renderWithRouterAndRedux(<App />, initialState, '/game')
        const loading = screen.getByText('Loading!')
        await waitForElementToBeRemoved(loading);

        const buttonQuestion0 = screen.getByRole('button', { name: 'False'})

        expect(buttonQuestion0).toBeInTheDocument();

        userEvent.click(buttonQuestion0);

        const buttonNext0 = screen.getByRole('button', { name: 'Next'})

        expect(buttonNext0).toBeInTheDocument();

        userEvent.click(buttonNext0);


        const buttonQuestion1 = screen.getByRole('button', { name: 'Elric'})

        expect(buttonQuestion1).toBeInTheDocument();

        userEvent.click(buttonQuestion1);

        const buttonNext1 = screen.getByRole('button', { name: 'Next'})

        expect(buttonNext1).toBeInTheDocument();

        userEvent.click(buttonNext1);


        const buttonQuestion2 = screen.getByRole('button', { name: '4'})

        expect(buttonQuestion2).toBeInTheDocument();

        userEvent.click(buttonQuestion2);

        const buttonNext2 = screen.getByRole('button', { name: 'Next'})

        expect(buttonNext2).toBeInTheDocument();

        userEvent.click(buttonNext2);


        const buttonQuestion3 = screen.getByRole('button', { name: 'True'})

        expect(buttonQuestion3).toBeInTheDocument();

        userEvent.click(buttonQuestion3);

        const buttonNext3 = screen.getByRole('button', { name: 'Next'})

        expect(buttonNext3).toBeInTheDocument();

        userEvent.click(buttonNext3);

        

        const buttonQuestion4 = screen.getByRole('button', { name: '7'})

        expect(buttonQuestion4).toBeInTheDocument();

        userEvent.click(buttonQuestion4);

        const buttonNext4 = screen.getByRole('button', { name: 'Next'})

        expect(buttonNext4).toBeInTheDocument();

        userEvent.click(buttonNext4);

        await waitFor(() => expect(history.location.pathname).toBe('/feedback'))
    })
    it('Test response code', async () => {
        const { history } = renderWithRouterAndRedux(<App />, initialState, '/game')
        const loading = screen.getByText('Loading!')
        await waitForElementToBeRemoved(loading);

        const buttonQuestion0 = screen.getByRole('button', { name: 'False'})
        expect(buttonQuestion0).toBeInTheDocument();


        // await waitFor(() => expect(history.location.pathname).toBe('/'))

    })
    it('Test response code 3 and redirect "/"', async () => {
        const stateLocal = {
            response_code: 3,
            results: []
        }

        jest.spyOn(global, 'fetch').mockResolvedValue({
            json: jest.fn().mockResolvedValue(stateLocal),
          });
        const { history } = renderWithRouterAndRedux(<App />, initialState, '/game')
        const loading = screen.getByText('Loading!')
        await waitForElementToBeRemoved(loading);

        expect(history.location.pathname).toBe('/');
    })

    it('aw', async () => {
    renderWithRouterAndRedux(<App />, initialState, '/game')
    const loading = screen.getByText('Loading!')
    await waitForElementToBeRemoved(loading);

    const textTimer = await screen.findByText('0', {}, {timeout: 31000});

    expect(textTimer).toBeInTheDocument();
    
    })
})