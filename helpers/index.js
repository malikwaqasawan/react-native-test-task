const getURLSearch = ({
  query = 'looser',
  limit = 10,
  rating = 'r',
  offset = 1,
  lang = 'en',
}) => {
  const endpoint = 'api.giphy.com/v1/gifs/search';
  const url = 'https://' + endpoint + '?';
  const apiKey = 'YIgFoVU5Y8vghmhTR4LmyhZffICVJHA7';
  const params = {
    api_key: apiKey,
    q: query,
    limit: limit,
    rating: rating,
    offset: offset,
    lang: lang,
  };

  return url + encodeQueryData(params);
};

function encodeQueryData(data) {
  const ret = [];
  for (let d in data) {
    ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
  }
  return ret.join('&');
}

export default getURLSearch;