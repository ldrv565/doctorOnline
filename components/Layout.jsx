import styled from 'styled-components';

const Layout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 24px;
  background: ${({ theme }) => theme.palette.background.secondary};
  border-radius: 8px;
  height: calc(100vh - 48px);
`;

export default Layout;
