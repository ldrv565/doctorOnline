import { useContext } from 'react';

import { TokenContext } from 'components/providers';

const useToken = () => {
  return useContext(TokenContext);
};

export default useToken;