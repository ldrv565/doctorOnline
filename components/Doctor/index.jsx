import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

import { DEFAULT_ROOM_NAME } from 'constants';

import { useFetchToken } from '../common/hooks';

const Doctor = () => {
  const [roomTokenStatus] = useFetchToken(DEFAULT_ROOM_NAME);
  const router = useRouter();

  useEffect(() => {
    if (roomTokenStatus.success && roomTokenStatus.data) {
      localStorage.setItem('token', roomTokenStatus.data);
      router.push(`/doctor/room/${DEFAULT_ROOM_NAME}`);
    }
  }, [roomTokenStatus.success, roomTokenStatus.data]);

  return <div>Создание комнаты...</div>;
};

export default Doctor;
