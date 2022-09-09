import getToken from './fetchAPI';

const getQuestions = async () => {
  const tokenObject = await getToken();
  const { token } = tokenObject;

  const responseQuestions = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
  const questions = await responseQuestions.json();
  const { results } = questions;

  return results;
};

export default getQuestions;
