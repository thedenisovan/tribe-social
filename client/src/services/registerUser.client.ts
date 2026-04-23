import URL from '../const/url';

export default async function registerUser(
  email: string,
  firstName: string,
  lastName: string,
  password: string,
  passwordConfirmation: string,
) {
  if (!firstName || !lastName || !email || !password || !passwordConfirmation) {
    throw new Error('All input fields must be provided.');
  }

  const response = await fetch(`${URL.baseURL}signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      firstName,
      lastName,
      email,
      password,
      passwordConfirmation,
    }),
  });

  if (!response.ok) {
    throw new Error(
      `Error text: ${await response.text()}, Error code: ${response.status}`,
    );
  }

  const result = await response.json();

  return result;
}
