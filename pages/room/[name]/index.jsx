import React from 'react';

import { useParticipants, useToken } from 'components/common/hooks';
import { Layout } from 'components';

const Room = () => {
  const { token } = useToken();
  const participants = useParticipants('qwe', token);
  return (
    <Layout>
      {participants.length}
    </Layout>
  );
};

export default Room;
