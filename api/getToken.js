const getToken = (identity, roomName) =>
  fetch(`/api/token?identity=${identity}&roomName=${roomName}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => res.json());

export default getToken;
