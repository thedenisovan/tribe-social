import { createContext } from 'react';
import type { Decoded } from '../types/auth';

interface CurrentPageContextType {
  currentPage: string;
  setCurrentPage: React.Dispatch<React.SetStateAction<string>>;
}

const DashContext = createContext<Decoded | null>(null);
const CurrentPageContext = createContext<CurrentPageContextType | null>(null);

export { CurrentPageContext };
export default DashContext;
