import { createContext } from 'react';
import type { Decoded } from '../types/auth';

const DashContext = createContext<Decoded | null>(null);

export default DashContext;
