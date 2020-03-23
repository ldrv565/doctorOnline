/* eslint-disable jsx-a11y/media-has-caption */
import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Participant = ({ participant, ...rest }) => {
  const [videoTracks, setVideoTracks] = useState([]);
  const [audioTracks, setAudioTracks] = useState([]);

  const videoRef = useRef();
  const audioRef = useRef();

  const trackpubsToTracks = trackMap =>
    Array.from(trackMap.values())
      .map(publication => publication.track)
      .filter(track => track !== null);

  useEffect(() => {
    setVideoTracks(trackpubsToTracks(participant.videoTracks));
    setAudioTracks(trackpubsToTracks(participant.audioTracks));

    const trackSubscribed = track => {
      if (track.kind === 'video') {
        setVideoTracks(prevVideoTracks => [...prevVideoTracks, track]);
      } else {
        setAudioTracks(prevAudioTracks => [...prevAudioTracks, track]);
      }
    };

    const trackUnsubscribed = track => {
      if (track.kind === 'video') {
        setVideoTracks(prevVideoTracks =>
          prevVideoTracks.filter(v => v !== track)
        );
      } else {
        setAudioTracks(prevAudioTracks =>
          prevAudioTracks.filter(a => a !== track)
        );
      }
    };

    participant.on('trackSubscribed', trackSubscribed);
    participant.on('trackUnsubscribed', trackUnsubscribed);

    return () => {
      setVideoTracks([]);
      setAudioTracks([]);
      participant.removeAllListeners();
    };
  }, [participant]);

  useEffect(() => {
    const videoTrack = videoTracks[0];
    if (videoTrack) {
      videoTrack.attach(videoRef.current);
    }

    return () => {
      if (videoTrack) {
        videoTrack.detach();
      }
    };
  }, [videoTracks]);

  useEffect(() => {
    const audioTrack = audioTracks[0];
    if (audioTrack) {
      audioTrack.attach(audioRef.current);
    }

    return () => {
      if (audioTrack) {
        audioTrack.detach();
      }
    };
  }, [audioTracks]);

  return (
    <Container {...rest}>
      <Title>{participant.identity}</Title>
      <video ref={videoRef} autoPlay />
      <audio ref={audioRef} autoPlay />
    </Container>
  );
};

Participant.propTypes = {
  participant: PropTypes.object
};

export default Participant;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &:not(:last-of-type) {
    margin-bottom: 24px;
  }

  video {
    height: 40vh;
    border-radius: 8px;
  }
`;

const Title = styled.div`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 24px;
`;
