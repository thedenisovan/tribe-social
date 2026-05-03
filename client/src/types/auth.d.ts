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

export interface DefaultUser {
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

export interface FullUser extends DefaultUser {
  posts: PostData[];
  follower: User[];
  following: User[];
  savedPosts: PostData[];
}

export interface Post {
  authorId: number;
  createdAt: string;
  id: number;
  postData: string;
  postMediaUrl: string | null;
}

export interface SavedPost {
  post: Post;
  postId: number;

  savedBy: DefaultUser;
  savedById: number;

  savedAt: string;
}

export interface Comment {
  commentId: number;
  comment: string;
  commentedAt: string;

  post: Post;
  postId: number;

  commentAuthor: DefaultUser;
  authorId: number;

  likes: LikeOnComment[];
}

interface LikeOnComment {
  comment: Comment;
  commentId: number;

  likedBy: DefaultUser;
  userId: number;
}

interface LikeOnPost {
  post: Post;
  postId: number;

  likedBy: DefaultUser;
  userId: number;
}
