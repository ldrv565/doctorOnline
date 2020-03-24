import React from 'react';

import {
  Page,
  Wrap,
  Header,
  LogoStyled,
  Title,
  Desc,
  Content,
  Footer,
  Support,
  Phone
} from './styled';

export const Layout = ({ children }) => {
  return (
    <Page>
      <Wrap>
        <Header>
          <LogoStyled />
          <Title>АРМ МЕД</Title>
          <Desc>Инновационная медицинская система</Desc>
        </Header>

        <Content>{children}</Content>

        <Footer>
          <Support>Техническая поддержка</Support>
          <br />
          <Phone>8 800 700-86-68</Phone>
        </Footer>
      </Wrap>
    </Page>
  );
};
