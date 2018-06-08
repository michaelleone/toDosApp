
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

export async function postJson (object, APIURL) {
  return new Promise((resolve, reject) => {
    window.fetch(APIURL, {
      method: 'post',
      headers: new window.Headers({'Content-Type': 'application/json'}),
      body: JSON.stringify(object)
    })
      .then(resp => handleErrors(resp))
      .then(newTodo => resolve(newTodo))
  })
}
