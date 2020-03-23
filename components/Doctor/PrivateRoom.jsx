import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { useRoom } from 'hooks';

import { Button } from '@material-ui/core';

import Participant from '../Participant';

const GeneralRoom = ({ roomName, resetSelectedRoom }) => {
  const { room, participants } = useRoom('Доктор', roomName);

  if (!room) {
    return <div>Подключение к {roomName}</div>;
  }

  return (
    <>
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
        null}
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
