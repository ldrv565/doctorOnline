import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { useParticipants, useToken } from 'components/common/hooks';

import Participant from 'components/TwilioVideo/Participant';

const Conference = ({ name, sid }) => {
  const { token } = useToken();
  const [participants, room] = useParticipants(name, token);
  const currentParticipant = participants.find(
    participant => participant.sid === sid
  );

  useEffect(() => {
    if (currentParticipant && room.localParticipant) {
      alert(`Ссылка на конференцию /room/${name}/${room.localParticipant.sid}`);
    }
  }, [currentParticipant, room]);

  return (
    <div style={{ display: 'flex' }}>
      {room && <Participant participant={room.localParticipant} />}
      {currentParticipant && <Participant participant={currentParticipant} />}
    </div>
  );
};

Conference.propTypes = {
  sid: PropTypes.string,
  name: PropTypes.string
};

Conference.getInitialProps = ({ query: { name, sid } }) => {
  return { name, sid };
};

export default Conference;
