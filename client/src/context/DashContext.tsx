import { createContext } from 'react';
import type { FullUser, Post } from '../types/auth';

interface CurrentPageContextType {
  currentPage: string;
  setCurrentPage: React.Dispatch<React.SetStateAction<string>>;
}

interface ApiDataContext {
  setFullUser: React.Dispatch<React.SetStateAction<FullUser | null>>;
  fullUser: FullUser | null;
  userPosts: Post[] | [];
  setUserPosts: React.Dispatch<React.SetStateAction<Post[] | []>>;
}

const DashContext = createContext<ApiDataContext | null>(null);
const CurrentPageContext = createContext<CurrentPageContextType | null>(null);

export { CurrentPageContext };
export default DashContext;
