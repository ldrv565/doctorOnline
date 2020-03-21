import React, { useEffect, useState } from 'react';
import Router from 'next/router';
import { useToken } from '../hooks';

const CreateRoomForm = () => {
  const { fetchToken, token } = useToken();
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');

  const handleSubmit = () => {
    fetchToken(name, room);
  };

  useEffect(() => {
    if (token) Router.push(`/room/${room}`);
  }, [token]);

  return (
    <div>
      <input
        type="text"
        placeholder="name"
        value={name}
        onChange={({ target: { value } }) => setName(value)}
      />
      <input
        type="text"
        placeholder="room name"
        value={room}
        onChange={({ target: { value } }) => setRoom(value)}
      />
      <button onClick={handleSubmit}>Sign room</button>
    </div>
  );
};

export default CreateRoomForm;
