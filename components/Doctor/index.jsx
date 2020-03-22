import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

import { useFetchToken } from '../common/hooks';

const DOCTOR_ROOM_NAME = 'Комната врача';

const Doctor = () => {
  const [roomTokenStatus] = useFetchToken(DOCTOR_ROOM_NAME);
  const router = useRouter();

  useEffect(() => {
    if (roomTokenStatus.success && roomTokenStatus.data) {
      localStorage.setItem('token', roomTokenStatus.data);
      router.push(`/doctor/room/${DOCTOR_ROOM_NAME}`);
    }
  }, [roomTokenStatus.success, roomTokenStatus.data]);

  return <div>Создание комнаты...</div>;
};

export default Doctor;
