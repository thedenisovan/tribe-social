import URL from '../constants/url';

export async function updateUserProfile(data: {
  firstName?: string;
  lastName?: string;
  bio?: string;
  password?: string;
}) {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('Could not extract token from local storage.');
  }

  try {
    const response = await fetch(
      `${URL.baseURL}dashboard/profile/updatePersonalProfile`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          authorization: 'Bearer ' + token,
        },
        body: JSON.stringify(data),
      },
    );

    if (!response.ok) {
      return {
        errors: [await response.text()],
        user: null,
      };
    }

    const result = await response.json();

    return result;
  } catch (e) {
    if (e instanceof Error) {
      console.log(`Error ${e.message}`);
    } else {
      console.log('Unknown error');
    }
  }
}
