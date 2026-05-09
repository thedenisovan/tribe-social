import URL from '../constants/url';

export default async function newComment(
  comment: string,
  postId: number,
  authorId: number,
) {
  // Validate input data
  if (!authorId || !comment || !postId || isNaN(authorId) || isNaN(postId)) {
    throw new Error('No user id or post data provided.');
  }
  const sanitizedPost = comment.trim();

  if (sanitizedPost.length < 1 || sanitizedPost.length > 50) {
    throw new Error(
      'Post data length must be between one and fifty characters.',
    );
  }

  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('Could not extract token from local storage.');
  }

  // New post
  try {
    const response = await fetch(`${URL.baseURL}dashboard/newComment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: 'Bearer ' + token,
      },
      body: JSON.stringify({ postId, authorId, comment }),
    });

    if (!response.ok) {
      throw new Error(
        `Error status: ${response.status}, error message: ${await response.text()}`,
      );
    }

    const result = await response.json();

    return result;
  } catch (e) {
    if (e instanceof Error) {
      throw new Error(`Error msg: ${e.message}`);
    } else {
      throw new Error('Unknown error.');
    }
  }
}
