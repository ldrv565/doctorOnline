import React, { useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { useRoom } from 'hooks';

import Participant from '../Participant';

const GeneralRoom = ({ username, setError }) => {
  const { room, isError } = useRoom(username);

  useEffect(() => {
    setError(isError);
  }, [isError]);

  const { room: privateRoom, participants: privateParticipants } = useRoom(
    username,
    username
  );

  if (!room) {
    return <div>Loading...</div>;
  }

  if (!privateParticipants.length) {
    return <Participant participant={room.localParticipant} />;
  }

  return (
    <>
      <Me participant={privateRoom.localParticipant} />

      {privateParticipants.length &&
        privateParticipants.map(participant => (
          <Participant participant={participant} />
        ))}
    </>
  );
};

GeneralRoom.propTypes = {
  username: PropTypes.string,
  setError: PropTypes.func
};

export default GeneralRoom;

const Me = styled(Participant)`
  video {
    height: 15vh;
  }
`;
