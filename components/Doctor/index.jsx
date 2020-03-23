import React, { useState } from 'react';
import styled from 'styled-components';

import { MenuItem } from '@material-ui/core';

import { useRoom } from 'hooks';

import Participant from '../Participant';
import PrivateRoom from './PrivateRoom';

const DoctorPage = () => {
  const { room, participants } = useRoom();

  const [selectedRoom, setSelectedRoom] = useState(null);
  const resetSelectedRoom = () => setSelectedRoom(null);

  if (!room && !selectedRoom) {
    return <div>Loading...</div>;
  }

  if (!selectedRoom) {
    return (
      <>
        <Participant participant={room.localParticipant} />

        {participants.length ? (
          <List>
            {participants.map(participant => {
              const isChecker = participant.identity.split('.')[0] === 'check';

              if (!isChecker) {
                return (
                  <MenuItemStyled
                    key={participant.sid}
                    onClick={() => setSelectedRoom(participant.identity)}
                  >
                    Принять вызов {participant.identity}
                  </MenuItemStyled>
                );
              }

              return null;
            })}
          </List>
        ) : (
          <div>Ожидание пациентов</div>
        )}
      </>
    );
  }

  return (
    <PrivateRoom
      roomName={selectedRoom}
      resetSelectedRoom={resetSelectedRoom}
    />
  );
};

export default DoctorPage;

const MenuItemStyled = styled(MenuItem)`
  &:not(:last-of-type) {
    border-bottom: 1px solid ${({ theme }) => theme.palette.divider};
  }
`;

const List = styled.div`
  margin-top: 24px;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.palette.divider};
  background: ${({ theme }) => theme.palette.background.secondary};
`;
