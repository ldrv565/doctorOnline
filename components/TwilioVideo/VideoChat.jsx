import React, { useState, useCallback } from 'react';
import Lobby from './Lobby';
import Room from './Room';

const VideoChat = () => {
  const [username, setUsername] = useState('');
  const roomName = 'room';
  const [token, setToken] = useState(null);

  const handleUsernameChange = useCallback(event => {
    setUsername(event.target.value);
  }, []);

  const handleSubmit = useCallback(
    async event => {
      event.preventDefault();
      const data = await fetch(
        `/api/token?identity=${username}&roomName=${roomName}`,
        {
          method: 'GET',

          headers: {
            'Content-Type': 'application/json'
          }
        }
      ).then(res => res.json());
      setToken(data.token);
    },
    [username]
  );

  const handleLogout = useCallback(() => {
    setToken(null);
  }, []);

  return (
    <>
      {token ? (
        <Room roomName={roomName} token={token} handleLogout={handleLogout} />
      ) : (
        <Lobby
          username={username}
          roomName={roomName}
          handleUsernameChange={handleUsernameChange}
          handleSubmit={handleSubmit}
        />
      )}
    </>
  );
};

export default VideoChat;
