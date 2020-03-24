import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { useRoom } from 'hooks';

import Participant from '../Participant';
import TopBar from './TopBar';
import { Loader } from '../common';

const GeneralRoom = ({ roomName, resetSelectedRoom }) => {
  const { room, participants } = useRoom('Доктор', roomName);

  if (!room) {
    return <Loader>Подключение к {roomName}</Loader>;
  }

  return (
    <Wrapper>
      <TopBar />
      <VideoWrapper>
        {(participants.length &&
          participants.map(participant => (
            <Participant key={participant.sid} participant={participant} />
          ))) ||
          'Пациент потерял связь'}
      </VideoWrapper>

      {/* <Me participant={room.localParticipant} /> */}
    </Wrapper>
  );
};

GeneralRoom.propTypes = {
  roomName: PropTypes.string
};

export default GeneralRoom;

const Me = styled(Participant)`
  video {
    height: 15vh;
    position: absolute;
    bottom: 10px;
    left: 0;
  }
`;

const VideoWrapper = styled.div`
  display: flex;
  height: calc(100vh - 64px);
  justify-content: center;
`;

const Wrapper = styled.div`
  position: relative;
  height: 100vh;
  overflow: hidden;
`;
