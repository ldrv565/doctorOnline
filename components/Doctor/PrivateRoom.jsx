import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { useRoom } from 'hooks';

import { Button } from '@material-ui/core';

import Participant from '../Participant';
import TopBar from './TopBar';

const VideoWrapper = styled.div`
  display: flex;
  height: calc(100vh - 64px);
  background: red;
`;

const ParticipantStyles = styled(Participant)`
  video {
      height: 100%;
      width: 100%;
      object-fit: fill;
  }
`;

const GeneralRoom = ({ roomName, resetSelectedRoom }) => {
  const { room, participants } = useRoom('Доктор', roomName);

  if (!room) {
    return <div>Подключение к {roomName}</div>;
  }

  return (
    <>
      <TopBar />
      <VideoWrapper>
        <Me />
      </VideoWrapper>
      <ButtonStyled
        variant="contained"
        color="primary"
        onClick={resetSelectedRoom}
      >
        Вернуться к выбору пациента
      </ButtonStyled>

      <Me participant={room.localParticipant} />

      {(participants.length &&
        participants.map(participant => (
          <Participant participant={participant} />
        ))) ||
      'Пациент потерял связь'}
    </>
  );
};

GeneralRoom.propTypes = {
  roomName: PropTypes.string
};

export default GeneralRoom;

const Me = styled(Participant)`
  video {
    height: 15vh;
  }
`;

const ButtonStyled = styled(Button)`
  margin-bottom: 24px;
`;
