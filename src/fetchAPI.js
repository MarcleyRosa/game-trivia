const API_BASE = 'https://opentdb.com/api_token.php?command=request';

const getToken = async () => {
  const response = await fetch(API_BASE);
  const result = await response.json();
  return result;
};

export default getToken;
