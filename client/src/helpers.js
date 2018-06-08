// Seperated out fetch request error handling for clarity.
export function handleErrors (resp) {
  if (!resp.ok) {
    if (resp.status >= 400 && resp.status < 500) {
      return resp.json().then(data => {
        let err = {errorMessage: data.message}
        throw err
      })
    } else {
      let err = {errorMessage: 'Please try again later, server is being a bad boy'}
      throw err
    }
  }
  return resp.json()
}

// Encapsulates stringification, header construction and error handling
export async function apirequest (object, APIURL, method) {
  return new Promise((resolve) => {
    const params = (method === 'post' || 'update') // add body and headers for posts/updates
      ? {
        method: method,
        headers: new window.Headers({'Content-Type': 'application/json'}),
        body: JSON.stringify(object)
      }
      : {
        method: method
      }

    window.fetch(APIURL, params)
      .then(resp => handleErrors(resp))
      .then(newTodo => resolve(newTodo))
  })
}
