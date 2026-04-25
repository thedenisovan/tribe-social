export default interface AuthData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

export interface Decoded {
  user: User;
  iat: number;
  exp: number;
}

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  bio?: string;
  password: string;
  registeredAt?: string;
  avatarUrl?: string;
  isOnline: boolean;
}
