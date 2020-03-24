import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { MenuItem } from '@material-ui/core';

import { Loader } from 'components/common';
import { useRoom } from 'hooks';

import { useRouter } from 'next/router';
import PrivateRoom from './PrivateRoom';
import Layout from '../Layout';

const DoctorPage = () => {
  const {
    query: { patientIdentity }
  } = useRouter();
  const { room, participants } = useRoom();
  const [selectedRoom, setSelectedRoom] = useState(null);
  const resetSelectedRoom = () => setSelectedRoom(null);

  useEffect(() => {
    if (patientIdentity) setSelectedRoom(patientIdentity);
  }, [patientIdentity]);

  if (!room && !selectedRoom) {
    return <Loader>Loading...</Loader>;
  }

  if (!selectedRoom) {
    return (
      <Layout>
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
      </Layout>
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
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.palette.divider};
  background: ${({ theme }) => theme.palette.background.secondary};
`;
