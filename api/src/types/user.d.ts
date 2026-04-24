export default interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  bio: string | null;
  hashedPassword: string;
  registeredAt: string;
  avatarUrl: string | null;
  isOnline: boolean;
}
