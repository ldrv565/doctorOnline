import React, { useEffect, useState } from 'react';
import Router from 'next/router';
import { useFetchToken } from '../hooks';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const CreateRoomForm = () => {
  const [requestStatus, request] = useFetchToken('', '', true);
  const [name, setName] = useState('');

  const handleSubmit = async () => {
    request('Комната врача', name);
  };

  useEffect(() => {
    if (requestStatus.success) {
      localStorage.setItem('token', requestStatus.data);
      Router.push('/client/room/Комната врача');
    }
  }, [requestStatus]);

  return (
    <div>
      <TextField
        type="text"
        placeholder="Укажите ваше имя"
        value={name}
        onChange={({ target: { value } }) => setName(value)}
      />
      <Button color="primary" onClick={handleSubmit}>Подключиться к комнате</Button>
    </div>
  );
};

export default CreateRoomForm;
