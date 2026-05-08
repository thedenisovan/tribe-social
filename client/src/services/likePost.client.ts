import URL from '../constants/url';

export default async function likePost(postId: number, userId: number) {
  const token = localStorage.getItem('token');

  if (!token) {
    throw new Error(`Could not find token :(`);
  }

  try {
    const response = await fetch(`${URL.baseURL}dashboard/likePost`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        authorization: 'Bearer ' + token,
      },
      body: JSON.stringify({ postId, userId }),
    });

    if (!response.ok) {
      throw new Error(`Error ${await response.text()}`);
    }

    const result = await response.json();

    return result;
  } catch (e) {
    if (e instanceof Error) {
      throw new Error(`Error message: ${e.message}`);
    } else {
      throw new Error(`Unknown error.`);
    }
  }
}
