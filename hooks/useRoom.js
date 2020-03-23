import { useState, useEffect } from 'react';

import Video from 'twilio-video';

import { getToken } from 'api';

const checkUsernameUniqueness = async (username, roomName) => {
  const { token: checkToken } = await getToken(
    `check.${+new Date()}`,
    roomName
  );

  const room = await Video.connect(checkToken, {
    name: roomName
  });

  let uniqueness = true;

  room.participants.forEach(participant => {
    if (participant.identity === username) {
      uniqueness = false;
    }
  });

  room.disconnect();

  return uniqueness;
};

const disconnect = currentRoom => {
  if (currentRoom && currentRoom.localParticipant.state === 'connected') {
    currentRoom.localParticipant.tracks.forEach(trackPublication =>
      trackPublication.track.stop()
    );
    currentRoom.disconnect();
    return null;
  }

  return currentRoom;
};

const useRoom = (username = 'Доктор', roomName = 'room') => {
  const [token, setToken] = useState(null);
  const [room, setRoom] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [isError, setError] = useState(false);

  const participantConnected = participant => {
    setParticipants(prevParticipants => [...prevParticipants, participant]);
  };

  const participantDisconnected = participant => {
    setParticipants(prevParticipants =>
      prevParticipants.filter(p => p !== participant)
    );
  };

  useEffect(() => {
    if (roomName === 'room' && username !== 'Доктор') {
      checkUsernameUniqueness(username, roomName).then(uniqueness => {
        if (uniqueness) {
          getToken(username, roomName).then(tokenData =>
            setToken(tokenData.token)
          );
        } else {
          setError(true);
        }
      });
    } else {
      getToken(username, roomName).then(tokenData => setToken(tokenData.token));
    }
  }, []);

  useEffect(() => {
    if (token) {
      Video.connect(token, {
        name: roomName
      }).then(videoRoom => {
        setRoom(videoRoom);
        videoRoom.on('participantConnected', participantConnected);
        videoRoom.on('participantDisconnected', participantDisconnected);
        videoRoom.participants.forEach(participantConnected);
      });
    }

    return () => {
      setRoom(currentRoom => disconnect(currentRoom));
    };
  }, [token]);

  return { room, participants, isError };
};

export default useRoom;
