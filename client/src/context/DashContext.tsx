import { createContext } from 'react';
import type { Decoded, PostData } from '../types/auth';

interface CurrentPageContextType {
  currentPage: string;
  setCurrentPage: React.Dispatch<React.SetStateAction<string>>;
}

interface ApiDataContext {
  decoded: Decoded;
  userPosts: PostData[] | [];
  setUserPosts: React.Dispatch<React.SetStateAction<PostData[] | []>>;
}

const DashContext = createContext<ApiDataContext | null>(null);
const CurrentPageContext = createContext<CurrentPageContextType | null>(null);

export { CurrentPageContext };
export default DashContext;
