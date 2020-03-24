import styled from 'styled-components';

import { TextField } from '@material-ui/core';

const Form = styled.form`
  .MuiFormHelperText-root {
    position: absolute;
    top: 100%;
  }
`;

const FormTitle = styled.h3`
  margin: 0 0 36px;
  color: ${({ theme }) => theme.palette.text.primary};
  font-size: 1.5rem;
  font-weight: 600;
  line-height: 29px;
  text-align: center;
`;

const UserField = styled(TextField)`
  width: 100%;
  margin-bottom: 34px !important;
`;

const LoaderWrapper = styled.div(`
  display: flex;
  height: 100vh;
  align-items: center;
  justify-content: center;
`);

const Title = styled.div`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 24px;
`;

export { LoaderWrapper, Form, FormTitle, UserField, Title };
