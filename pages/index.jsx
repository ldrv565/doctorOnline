import React from 'react';
import styled from 'styled-components';

import { Button } from '@material-ui/core';

import { Layout } from 'components';

const IndexPage = () => {
  return (
    <Layout>
      <ButtonStyled variant="contained" color="primary">
        Вызов
      </ButtonStyled>
    </Layout>
  );
};

const ButtonStyled = styled(Button)`
  text-transform: unset;
`;

export default IndexPage;
