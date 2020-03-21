import { useEffect, useState } from 'react';
import Video from 'twilio-video';

const useRoom = (token, roomName) => {
  const [room, setRoom] = useState(null);

  useEffect(() => {
    if (token)
      Video.connect(token, {
        name: roomName
      }).then(videoRoom => {
        setRoom(videoRoom);
      });
  }, [token, roomName]);

  return room;
};

export default useRoom;
