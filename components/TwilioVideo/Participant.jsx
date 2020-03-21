import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const Participant = ({ participant }) => {
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
    <div className="participant">
      <h3>{participant.identity}</h3>
      <video ref={videoRef} autoPlay={true} />
      <audio ref={audioRef} autoPlay={true} />
    </div>
  );
};

Participant.propTypes = {
  participant: PropTypes.object
};

export default Participant;
