import React, { useCallback, useEffect, useState } from 'react';
import Router from 'next/router';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';

import { useFetchToken, useParticipants } from 'components/common/hooks';

import { Layout } from 'components';
import { List } from 'components/common';

const DoctorRoom = ({ name }) => {
  const [token, setToken] = useState(null);
  const [, request] = useFetchToken('', '', true);
  const [participants] = useParticipants(name, token);

  useEffect(() => {
    setToken(localStorage.getItem('token'));
  }, [name]);

  const handleClickParticipant = useCallback(participant => {
    return async () => {
      request(participant.sid).then(token =>
        Router.push(`/conference/${participant.sid}/${token}`)
      );
    };
  }, []);

  return (
    <RoomLayout>
      <Typography variant="h5">Название комнаты: {name}</Typography>
      <Typography variant="h5">Участники: </Typography>
      <List
        data={participants}
        renderItem={participant => (
          <List.Item button onClick={handleClickParticipant(participant)}>
            {participant.identity}
          </List.Item>
        )}
      />
    </RoomLayout>
  );
};

DoctorRoom.propTypes = {
  name: PropTypes.string
};

DoctorRoom.getInitialProps = ({ query: { name } }) => {
  return { name };
};

const RoomLayout = styled(Layout)`
  flex-direction: column;
`;

export default DoctorRoom;
