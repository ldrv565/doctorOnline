import { createContext } from 'react';

const noop = () => {};

const TokenContext = createContext({
  token: null,
  fetchToken: noop
});

export default TokenContext;
