import URL from '../const/url';

export default async function userAuth(
  email: string,
  password: string,
  isSignupPage: boolean,
  firstName?: string,
  lastName?: string,
  passwordConfirmation?: string,
) {
  const noInputErr = 'All input fields must be provided.';

  // If no inputs provided throw error
  if (
    isSignupPage &&
    (!email || !password || !firstName || !lastName || !passwordConfirmation)
  ) {
    throw new Error(noInputErr);
  } else if (!isSignupPage && (!email || !password)) {
    throw new Error(noInputErr);
  }

  // Body which will be sent in req obj depending on isSignupPage bool
  const body = isSignupPage
    ? { firstName, lastName, email, password, passwordConfirmation }
    : { email, password };

  const response = await fetch(
    `${URL.baseURL}auth/${isSignupPage ? 'signup' : 'signin'}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    },
  );

  // Status 409 means conflict, so user already exists
  if (!response.ok && response.status !== 409) {
    throw new Error(
      `Error text: ${await response.text()}, Error code: ${response.status}`,
    );
  }

  const result = await response.json();
  return result;
}
