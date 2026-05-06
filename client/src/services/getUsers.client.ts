import URL from '../constants/url';

export default async function getUsers(
  page: string | number,
  userId: string | number,
) {
  const token = localStorage.getItem('token');

  if (!token) {
    throw new Error('No token provided.');
  }

  try {
    const response = await fetch(
      `${URL.baseURL}dashboard/discover/getUsers/${userId}/${page}`,
      {
        headers: {
          'Content-Type': 'application/json',
          authorization: 'Bearer ' + token,
        },
      },
    );

    if (!response.ok) {
      throw new Error(`Error msg: ${await response.text()}`);
    }

    const result = await response.json();

    console.log(result);
    return result;
  } catch (e) {
    if (e instanceof Error) {
      throw new Error(`Error ${e.message}`);
    } else {
      throw new Error('Unknown error');
    }
  }
}
