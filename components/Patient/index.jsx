import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { Button } from '@material-ui/core';

import { getIdentity } from 'api';

import GeneralRoom from './GeneralRoom';
import { FormTitle, LoaderWrapper, Title, UserField } from './styled';
import { Layout } from './Layout';

const Patient = () => {
  const [username, setUsername] = useState('');
  const [inputValue, setInputValue] = useState(username);
  const [isError, setError] = useState(false);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    getIdentity().then(({ identity }) => {
      setLoading(false);
      if (identity) {
        setUsername(identity);
      }
    });
  }, []);

  const handleUsernameChange = event => setInputValue(event.target.value);

  const handleSubmit = () => {
    setError(false);
    setUsername(inputValue);
  };

  if (isLoading) {
    return <LoaderWrapper>Loading...</LoaderWrapper>;
  }

  if (!username || isError) {
    return (
      <Layout>
        <Form onSubmit={handleSubmit} noValidate>
          <FormTitle>Авторизация</FormTitle>
          {isError ? (
            <Title>Введите другое имя</Title>
          ) : (
            <Title>Введите имя</Title>
          )}
          <UserField
            label="Логин"
            required
            error={false}
            helperText={false}
            value={inputValue}
            onChange={handleUsernameChange}
          />

          <ButtonStyled type="submit">Войти</ButtonStyled>
        </Form>
      </Layout>
    );
  }

  return <GeneralRoom username={username} setError={setError} />;
};

export default Patient;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ButtonStyled = styled(Button)`
  margin-top: 24px;
`;
