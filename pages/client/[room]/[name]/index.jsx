import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { Button, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import styled from 'styled-components';

import { useFetchToken, useParticipants } from 'components/common/hooks';

import { Layout } from 'components';
import { List } from 'components/common';
import Participant from 'components/TwilioVideo/Participant';

const ClientRoom = ({ name }) => {
  const [token, setToken] = useState(null);
  const [participants, room] = useParticipants(name, token);
  const [requestStatus, request] = useFetchToken('', '', true);
  const router = useRouter();

  useEffect(() => {
    setToken(localStorage.getItem('token'));
  }, [name]);

  useEffect(() => {
    if (room)
      request(room.localParticipant.sid, room.localParticipant.identity);
  }, [room]);

  return (
    <RoomLayout>
      <Grid container>
        <Grid item xs={3}>
          <Typography variant="h5">Название комнаты: {name}</Typography>
          <ConnectButton
            color="primary"
            variant="contained"
            disabled={requestStatus.fetching || requestStatus.error}
            onClick={() =>
              router.push(
                `/conference/${room.localParticipant.sid}/${requestStatus.data}`
              )
            }
          >
            Перейти в комнату ожидания
          </ConnectButton>
          <Typography variant="h5">Участники: </Typography>
          <List
            data={participants}
            renderItem={participant => (
              <List.Item>{participant.identity}</List.Item>
            )}
          />
        </Grid>
        <Grid item xs={9}>
          {room && <Participant participant={room.localParticipant} />}
        </Grid>
      </Grid>
    </RoomLayout>
  );
};

ClientRoom.propTypes = {
  name: PropTypes.string
};

ClientRoom.getInitialProps = ({ query: { name } }) => {
  return { name };
};

const ConnectButton = styled(Button)`
  margin-bottom: 10px;
`;

const RoomLayout = styled(Layout)`
  padding: 20px;
  flex-direction: column;
`;

export default ClientRoom;
