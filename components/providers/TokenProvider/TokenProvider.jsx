import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import TokenContext from './TokenContext';

const TokenProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const fetchToken = async (username, roomName) => {
    await fetch(`/api/token?identity=${username}&roomName=${roomName}`, {
      method: 'GET',

      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(res => {
        localStorage.setItem('token', res.token);
        return res;
      })
      .then(res => setToken(res.token));
  };

  useEffect(() => {
    if (process.browser) {
      if (localStorage.getItem('token')) {
        setToken(localStorage.getItem('token'));
      }
    }
  }, []);

  return (
    <TokenContext.Provider
      value={{
        fetchToken,
        token
      }}
    >
      {children}
    </TokenContext.Provider>
  );
};

TokenProvider.propTypes = {
  children: PropTypes.node
};

export default TokenProvider;
