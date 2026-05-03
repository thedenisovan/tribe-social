import { useEffect } from 'react';
import useFetch from './useFetch';
import type { Decoded, FullUser } from '../types/auth';

export default function useDecodedData() {
  const {
    isLoading: loadingId,
    error: errorId,
    data: dataId,
  } = useFetch<Decoded>('dashboard/getUserId');

  const uid = dataId?.decoded.user ?? null;

  const { isLoading, error, data } = useFetch<FullUser>(
    uid ? `dashboard/profile/getUserProfile/${uid}` : null,
  );

  useEffect(() => {
    if (uid && dataId) {
      localStorage.setItem('exp', dataId.decoded.iat.toString());
      localStorage.setItem('uid', uid.toString());
    }
  }, [uid, dataId]);

  // Return first one which still is loading or first error
  return {
    isLoading: loadingId || isLoading,
    error: errorId || error,
    data,
  };
}
