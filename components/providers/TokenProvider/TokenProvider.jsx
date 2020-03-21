import React, { useState } from 'react';

import TokenContext from './TokenContext';

const TokenProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const fetchToken = async (username, roomName) => {
    const data = await fetch(
      `/api/token?identity=${username}&roomName=${roomName}`,
      {
        method: 'GET',

        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
      .then(res => res.json())
      .then(res => setToken(res.token));
  };

  return (
    <TokenContext.Provider
      value={{
        token,
        fetchToken
      }}
    >
      {children}
    </TokenContext.Provider>
  );
};

export default TokenProvider;
