

function parseJSON(response) {
  return response.json();
}
function parseText(response) {
  return response.text();
}
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

export  function request(url, options = {}) {
  const obj = { ...options };
  // if (!('credentials' in obj)) {
  //   obj.credentials = 'include';
  // }
  return fetch(url, obj)
    .then(checkStatus)
    .then(parseJSON)
    .then(data => ({ data }))
    .catch(err => ({ err }));
}
export  function requestCsv(url, options = {}) {
  const obj = { ...options };
  return fetch(url, obj)
    .then(checkStatus)
    .then(parseText)
    .then(data => ({ data}))
    .catch(err => ({ err }));
}

