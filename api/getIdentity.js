const getIdentity = () =>
  fetch('/api/identity', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => res.json());

export default getIdentity;
