const getIdentity = identity =>
  fetch(`/api/identity?identity=${identity}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => res.json());

export default getIdentity;
