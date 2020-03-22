import React, { useState } from 'react';
import Router from 'next/router';
import { useToken } from '../hooks';

const CreateRoomForm = () => {
  const { fetchToken } = useToken();
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');

  const handleSubmit = async () => {
    try {
      await fetchToken(name, room);
      Router.push(`/room/${room}`);
    } catch (e) {
      alert(e.message);
    }
  };

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
