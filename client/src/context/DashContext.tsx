import { createContext } from 'react';
import type { FullUser } from '../types/auth';

interface CurrentPageContextType {
  currentPage: string;
  setCurrentPage: React.Dispatch<React.SetStateAction<string>>;
}

interface ApiDataContext {
  setFullUser: React.Dispatch<React.SetStateAction<FullUser | null>>;
  fullUser: FullUser | null;
}

const DashContext = createContext<ApiDataContext | null>(null);
const CurrentPageContext = createContext<CurrentPageContextType | null>(null);

export { CurrentPageContext };
export default DashContext;
