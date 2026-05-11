import URL from '../constants/url';

export default async function unfollow(following: number) {
  const token = localStorage.getItem('token');

  if (!token) {
    throw new Error('no auth token');
  }

  try {
    const response = await fetch(`${URL.baseURL}dashboard/discover/unfollow`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: 'Bearer ' + token,
      },
      body: JSON.stringify({ following }),
    });

    if (!response.ok) {
      throw new Error(`${response.status}`);
    }

    const result = await response.json();

    console.log(result);
  } catch (e) {
    throw new Error(`Server e ${e}`);
  }
}
