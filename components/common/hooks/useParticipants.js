import { useEffect, useState } from 'react';

import useRoom from './useRoom';

const useParticipants = (roomName, token) => {
  const room = useRoom(token, roomName);
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    const participantConnected = participant => {
      setParticipants(prevParticipants => [...prevParticipants, participant]);
    };

    const participantDisconnected = participant => {
      setParticipants(prevParticipants =>
        prevParticipants.filter(p => p !== participant)
      );
    };

    if (room) {
      room.on('participantConnected', participantConnected);
      room.on('participantDisconnected', participantDisconnected);
      room.participants.forEach(participantConnected);
    }

    return () => {
      // if (room) room.disconnect();
    };
  }, [room]);

  return participants;
};

export default useParticipants;
