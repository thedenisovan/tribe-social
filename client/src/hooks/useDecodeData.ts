import { useEffect } from 'react';
import useFetch from './useFetch';
import type { Decoded, FullUser, Post } from '../types/auth';

export default function useDecodedData(
  setFullUser: React.Dispatch<React.SetStateAction<FullUser | null>>,
  setUserPosts: React.Dispatch<React.SetStateAction<Post[] | []>>,
) {
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

    if (data) {
      setFullUser(data);
      setUserPosts(data.posts);
    }
  }, [uid, dataId, data, setFullUser, setUserPosts]);

  // Return first one which still is loading or first error
  return {
    isLoading: loadingId || isLoading,
    error: errorId || error,
    data,
  };
}
