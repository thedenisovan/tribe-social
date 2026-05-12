import URL from '../constants/url';

export default async function acceptFollowRequest(
  senderId: number,
  isAccepted: boolean,
) {
  const token = localStorage.getItem('token');

  if (!token) {
    throw new Error('Could not extract auth token from local storage.');
  }

  try {
    const response = await fetch(
      `${URL.baseURL}dashboard/discover/acceptFollowRequest`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: 'Bearer ' + token,
        },
        body: JSON.stringify({ senderId, isAccepted }),
      },
    );

    if (!response.ok) {
      throw new Error(
        `Error status ${response.status}, error msg: ${await response.text()}`,
      );
    }

    const result = await response.json();

    return result;
  } catch (e) {
    if (e instanceof Error) {
      throw new Error(`Error ${e.message}`);
    } else {
      throw new Error('Unknown error.');
    }
  }
}
