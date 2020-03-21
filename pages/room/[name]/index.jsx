import React from 'react';

import { useParticipants, useToken } from 'components/common/hooks';
import { Layout } from 'components';

const Room = ({ name }) => {
  const { token } = useToken();

  const participants = useParticipants(name, token);
  return (
    <Layout>
      Room: {name}, {participants.length}
    </Layout>
  );
};

Room.getInitialProps = ({ query: { name } }) => {
  return { name };
};

export default Room;
