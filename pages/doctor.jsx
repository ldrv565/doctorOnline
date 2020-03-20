import React from 'react';
import styled from 'styled-components';

import { MenuItem } from '@material-ui/core';

import { Layout } from 'components';

const IndexPage = () => {
  return (
    <Layout>
      <List>
        <MenuItemStyled variant="contained" color="primary">
          Принять вызов 1
        </MenuItemStyled>
        <MenuItemStyled variant="contained" color="primary">
          Принять вызов 2
        </MenuItemStyled>
        <MenuItemStyled variant="contained" color="primary">
          Принять вызов 3
        </MenuItemStyled>
        <MenuItemStyled variant="contained" color="primary">
          Принять вызов 4
        </MenuItemStyled>
      </List>
    </Layout>
  );
};

export default IndexPage;

const MenuItemStyled = styled(MenuItem)`
  border-bottom: 1px solid ${({ theme }) => theme.palette.divider};
`;

const List = styled.div`
  border-radius: 8px;
  overflow: hidden;
`;
