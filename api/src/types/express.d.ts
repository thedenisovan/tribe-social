import 'express';

declare global {
  namespace Express {
    interface Request {
      user?: {
        user: number | string; // adjust to your real shape
      };
      userId: number;
    }
  }
}

export {};
