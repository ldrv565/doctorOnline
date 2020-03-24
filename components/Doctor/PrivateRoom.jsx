import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { useRoom } from 'hooks';

import { IconButton, Slider } from '@material-ui/core';
import { VolumeDown, VolumeUp } from '@material-ui/icons';

import { PhoneIcon, MicrophoneIcon } from 'public/icons';

import Participant from '../Participant';
import { Loader } from '../common';

const GeneralRoom = ({ roomName, resetSelectedRoom }) => {
  const { room, participants } = useRoom('Доктор', roomName);

  const [value, setValue] = useState(50);
  const onChange = (event, newValue) => setValue(newValue);

  const [muted, setMuted] = useState(false);
  const toggleMuted = () => setMuted(!muted);

  if (!room) {
    return <Loader>Подключение к {roomName}</Loader>;
  }

  return (
    <>
      <VideoWrapper>
        {participants[0] ? (
          <ParticipantStyled
            key={participants[0].sid}
            volume={value / 100}
            participant={participants[0]}
          />
        ) : (
          'Пациент потерял связь'
        )}
      </VideoWrapper>

      <ToolBar>
        <div>
          <SliderContainer>
            <VolumeDown />
            <Slider value={value} onChange={onChange} />
            <VolumeUp />
          </SliderContainer>
          <IconButtonStyled onClick={toggleMuted}>
            <MicrophoneIcon />
          </IconButtonStyled>
          <DropIconButton onClick={resetSelectedRoom}>
            <PhoneIcon />
          </DropIconButton>
        </div>
      </ToolBar>

      <Me volume={value / 100} participant={room.localParticipant} />
    </>
  );
};

GeneralRoom.propTypes = {
  roomName: PropTypes.string
};

export default GeneralRoom;

const ParticipantStyled = styled(Participant)`
  display: flex;
  justify-content: center;
`;

const Me = styled(Participant)`
  position: absolute;
  bottom: 22px;
  left: 22px;
  height: 15vh;
  width: auto;

  border: 2px solid white;
  border-radius: 8px;
`;

const VideoWrapper = styled.div`
  display: flex;
  height: calc(100vh - 64px);
  justify-content: center;
  align-items: center;
`;

const ToolBar = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;

  left: 0;
  width: 100%;
  bottom: 24px;

  & > div {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
  }
`;

const IconButtonStyled = styled(IconButton)`
  margin: 12px;

  border: 1px solid white;
`;

const DropIconButton = styled(IconButtonStyled)`
  background: rgba(255, 0, 0, 0.25);
`;

const SliderContainer = styled.div`
  display: flex;
  width: 140px;
  border: 1px solid white;
  padding: 12px;
  border-radius: 100px;
  align-items: center;

  svg {
    margin: 4px;
  }
`;
