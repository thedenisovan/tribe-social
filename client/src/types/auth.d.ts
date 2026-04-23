export default interface AuthData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

export interface User {
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
