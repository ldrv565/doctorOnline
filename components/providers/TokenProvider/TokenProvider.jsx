import React, { useEffect, useState } from 'react';

import TokenContext from './TokenContext';

const TokenProvider = ({ children, tokenProvider }) => {
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
      .then(res => {localStorage.setItem('token', res.token); return res;})
      .then(res => tokenProvider.setToken(res.token));
  };

  useEffect(() => {
    if (process.browser) {
      if (localStorage.getItem('token')) {
        tokenProvider.setToken(localStorage.getItem('token'));
      }
    }
  }, []);

  return (
    <TokenContext.Provider
      value={{
        ...tokenProvider,
        fetchToken
      }}
    >
      {children}
    </TokenContext.Provider>
  );
};

export default TokenProvider;
