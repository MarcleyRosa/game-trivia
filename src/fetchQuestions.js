const getQuestions = async (token) => {
  const responseQuestions = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
  const questions = await responseQuestions.json();

  return questions;
};

export default getQuestions;
