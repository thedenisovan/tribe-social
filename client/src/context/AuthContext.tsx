import { createContext } from 'react';
import type AuthData from '../types/auth';

interface AuthContextType {
  formData: AuthData;
  setFormData: React.Dispatch<React.SetStateAction<AuthData>>;

  formErrors: AuthData;
  setFormErrors: React.Dispatch<React.SetStateAction<AuthData>>;

  resetForm: () => void;
  resetFormErrors: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export default AuthContext;
