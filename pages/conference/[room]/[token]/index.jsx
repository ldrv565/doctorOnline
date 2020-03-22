import React from 'react';
import styled from 'styled-components';

import { useParticipants } from 'components/common/hooks';
import Participant from 'components/TwilioVideo/Participant';
import { Layout } from 'components';

const ConferencePage = ({ name, token }) => {
  const [participants, room] = useParticipants(name, token);
  return (
    <ConferenceLayout>
      {participants.length === 0 && (
        <div>
          Комната ожидания, врач в ближайшее свободное время подключится к вашей
          комнате!
        </div>
      )}
      <ConferenceWrapper>
        {room && <Participant participant={room.localParticipant} />}
        {participants.map(p => (
          <Participant key={p.sid} participant={p} />
        ))}
      </ConferenceWrapper>
    </ConferenceLayout>
  );
};

const ConferenceWrapper = styled.div`
  display: flex;
  & + div {
    margin-right: 10px;
  }
`;

const ConferenceLayout = styled(Layout)`
  flex-direction: column;
`;

ConferencePage.getInitialProps = ({ query: { name, token } }) => {
  return { name, token };
};

export default ConferencePage;
