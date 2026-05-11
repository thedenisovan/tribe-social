import URL from '../constants/url';

export default async function deletePost(postId: number) {
  if (!postId) {
    throw new Error('Post id and author id must be provided.');
  }

  const token = localStorage.getItem('token');

  if (!token) {
    throw new Error('Token must be provided.');
  }

  try {
    const response = await fetch(`${URL.baseURL}dashboard/deletePost`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: 'Bearer ' + token,
      },
      body: JSON.stringify({ postId }),
    });

    if (!response.ok) {
      throw new Error(
        `Error status ${response.status}, error message: ${await response.text()}`,
      );
    }

    const result = await response.json();

    return result.posts;
  } catch (e) {
    if (e instanceof Error) {
      throw new Error(`Error ${e.message}.`);
    } else {
      throw new Error('Unknown error.');
    }
  }
}
