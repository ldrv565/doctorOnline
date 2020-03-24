import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { Button, TextField } from '@material-ui/core';

import { getIdentity } from 'api';

import GeneralRoom from './GeneralRoom';

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
    return <div>Loading...</div>;
  }

  if (!username || isError) {
    return (
      <Form onSubmit={handleSubmit}>
        {isError ? (
          <Title>Введите другое имя</Title>
        ) : (
          <Title>Введите имя</Title>
        )}

        <TextFieldStyled
          required
          value={inputValue}
          onChange={handleUsernameChange}
        />

        <ButtonStyled type="submit" variant="contained" color="primary">
          Принять
        </ButtonStyled>
      </Form>
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

const Title = styled.div`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 24px;
`;

const ButtonStyled = styled(Button)`
  margin-top: 24px;
`;

const TextFieldStyled = styled(TextField)`
  input {
    text-align: center;
  }
`;
