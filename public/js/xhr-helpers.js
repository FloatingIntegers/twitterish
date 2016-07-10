// eslint-disable-next-line no-unused-vars
const createXhrHelpers = (XMLHttpRequest) => {
  const fetch = (url, cb = () => {}) => {
    const xhr = new XMLHttpRequest();

    xhr.addEventListener('load', () => {
      cb(xhr.responseText);
    });

    xhr.open('GET', url);
    xhr.send();
  };

  const post = (url, json, cb = () => {}) => {
    const xhr = new XMLHttpRequest();

    xhr.addEventListener('load', () => {
      cb(xhr.responseText);
    });

    xhr.open('POST', url);
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    xhr.send(JSON.stringify(json));
  };

  return {
    fetch,
    post,
  };
};
