import React, { useEffect, useState } from 'react';
import Router from 'next/router';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import { DEFAULT_ROOM_NAME } from 'constants';
import { useFetchToken } from '../hooks';

const CreateRoomForm = () => {
  const [requestStatus, request] = useFetchToken('', '', true);
  const [name, setName] = useState('');

  const handleSubmit = async () => {
    request(DEFAULT_ROOM_NAME, name);
  };

  useEffect(() => {
    if (requestStatus.success) {
      localStorage.setItem('token', requestStatus.data);
      Router.push(`/client/room/${DEFAULT_ROOM_NAME}`);
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
