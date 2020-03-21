import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Video from 'twilio-video';

import Participant from './Participant';

const Room = ({ roomName, token, handleLogout }) => {
  const [room, setRoom] = useState(null);
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

    Video.connect(token, {
      name: roomName
    }).then(videoRoom => {
      setRoom(videoRoom);
      videoRoom.on('participantConnected', participantConnected);
      videoRoom.on('participantDisconnected', participantDisconnected);
      videoRoom.participants.forEach(participantConnected);
    });

    return () => {
      setRoom(currentRoom => {
        if (currentRoom && currentRoom.localParticipant.state === 'connected') {
          currentRoom.localParticipant.tracks.forEach(trackPublication =>
            trackPublication.track.stop()
          );
          currentRoom.disconnect();
          return null;
        }

        return currentRoom;
      });
    };
  }, [roomName, token]);

  const remoteParticipants = participants.map(participant => (
    <Participant key={participant.sid} participant={participant} />
  ));

  return (
    <div className="room">
      <h2>Room: {roomName}</h2>
      <button type="button" onClick={handleLogout}>
        Log out
      </button>
      <div className="local-participant">
        {room ? (
          <Participant
            key={room.localParticipant.sid}
            participant={room.localParticipant}
          />
        ) : (
          ''
        )}
      </div>
      <h3>Remote Participants</h3>
      <div className="remote-participants">{remoteParticipants}</div>
    </div>
  );
};

export default Room;

Room.propTypes = {
  roomName: PropTypes.string,
  token: PropTypes.string,
  handleLogout: PropTypes.func
};
