import { createContext } from 'react';

const noop = () => {};

const TokenContext = createContext({
  token: null,
  setToken: noop,
  fetchToken: noop
});

export default TokenContext;