import { useCallback, useEffect, useState } from 'react';

const INITIAL_STATE = {
  data: null,
  error: null,
  fetching: false,
  success: false
};

const useFetchToken = (roomName, userName = 'Doctor', lazy = false) => {
  const [status, setStatus] = useState(INITIAL_STATE);

  const request = useCallback(async (room, name = 'Doctor') => {
    setStatus({ ...status, fetching: true });
    try {
      const response = await fetch(
        `/api/token?identity=${name}&roomName=${room}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      const data = await response.json();

      setStatus({
        ...status,
        data: data.token,
        fetching: false,
        success: true
      });

      return data.token;
    } catch (e) {
      setStatus({
        ...status,
        data: null,
        fetching: false,
        success: false,
        error: e.message
      });
    }
  }, []);

  useEffect(() => {
    if (!lazy) request(roomName, userName);
  }, [request, roomName]);

  return [status, request];
};

export default useFetchToken;
