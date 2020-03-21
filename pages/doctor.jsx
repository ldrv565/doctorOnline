import React from 'react';
import styled from 'styled-components';

import { MenuItem } from '@material-ui/core';

import { Layout, Doctor } from 'components';

const IndexPage = () => {
  return (
    <Layout>
      <Doctor />
    </Layout>
  );
};

export default IndexPage;

const MenuItemStyled = styled(MenuItem)`
  border-bottom: 1px solid ${({ theme }) => theme.palette.divider};
`;