export default interface AuthData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

export interface Decoded {
  decoded: { user: User; iat: number; exp: number };
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
  posts: PostData[];
  follower: User[];
  following: User[];
  savedPosts: PostData[];
}

export interface PostData {
  authorId: number;
  createdAt: string;
  id: number;
  postData: string;
  postMediaUrl: string | null;
}
