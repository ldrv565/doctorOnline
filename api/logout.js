const logout = () =>
  fetch('/api/logout', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => res.json());

export default logout;
