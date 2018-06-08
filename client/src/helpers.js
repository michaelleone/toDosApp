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
