import { createContext } from 'react';

const noop = () => {};

const TokenContext = createContext({
  token: '',
  fetchToken: noop
});

export default TokenContext;