const deserializeQuery = (query: string, noQuestionMark = false) => {
  const pairs = (noQuestionMark ? query : query.substring(1)).split('&');
  const array = pairs.map((elem) => elem.split('='));
  return Object.fromEntries(array);
};

export { deserializeQuery };
