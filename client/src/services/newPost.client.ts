import URL from '../constants/url';

export default async function newPost(postData: string, authorId: number) {
  if (!authorId || !postData || isNaN(authorId)) {
    throw new Error('No user id or post data provided.');
  }
  const sanitizedPost = postData.trim();

  if (sanitizedPost.length < 1 || sanitizedPost.length > 500) {
    throw new Error(
      'Post data length must be between one and five hundred characters.',
    );
  }

  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('Could not extract token from local storage.');
  }

  try {
    const response = await fetch(`${URL.baseURL}dashboard/home/newPost`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: 'Bearer ' + token,
      },
      body: JSON.stringify({ authorId, postData }),
    });

    if (!response.ok) {
      throw new Error(
        `Error status: ${response.status}, error message: ${await response.text()}`,
      );
    }
  } catch (e) {
    if (e instanceof Error) {
      throw new Error(`Error msg: ${e.message}`);
    } else {
      throw new Error('Unknown error.');
    }
  }
}
