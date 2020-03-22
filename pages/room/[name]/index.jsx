import React, { useCallback } from 'react';
import Router from 'next/router';
import PropTypes from 'prop-types';
import { MenuItem } from '@material-ui/core';

import { useParticipants, useToken } from 'components/common/hooks';

import { Layout } from 'components';
import { List } from 'components/common';
import Participant from 'components/TwilioVideo/Participant';
import styled from 'styled-components';

const Room = ({ name }) => {
  const { token } = useToken();
  const [participants, room] = useParticipants(name, token);

  const handleClickParticipant = useCallback(participant => {
    return () => {
      Router.push(`/room/${name}/${participant.sid}`);
    };
  }, []);

  return (
    <RoomLayout>
      <div>Название комнаты: {name}</div>
      <div>Участники: </div>
      <List
        data={participants}
        renderItem={participant => (
          <MenuItemStyled onClick={handleClickParticipant(participant)}>
            {participant.identity}
          </MenuItemStyled>
        )}
      />
      {room && <Participant participant={room.localParticipant} />}
    </RoomLayout>
  );
};

Room.propTypes = {
  name: PropTypes.string
};

Room.getInitialProps = ({ query: { name } }) => {
  return { name };
};

const MenuItemStyled = styled(MenuItem)`
  border-bottom: 1px solid ${({ theme }) => theme.palette.divider};
`;

const RoomLayout = styled(Layout)`
  flex-direction: column;
`;

export default Room;
