import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import type User from '../types/user.js';
import 'dotenv/config';
const secret = process.env.JWT_SECRET_KEY as string;

export default function generateJwtToken(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const user = req.user as User;

  if (!user) {
    throw new Error(`Could not get user data from request object.`);
  }

  // Encode user object and generate jwt token
  jwt.sign({ user }, secret, { expiresIn: '3d' }, (err, token) => {
    if (err) return next(err);
    res.json({ token });
  });
}

export function verifyToken(
  // Intersect request object with token eg req.token
  req: Request,
  res: Response,
  next: NextFunction,
) {
  // Get auth header value
  const bearerHeader = req.headers['authorization'];

  // Check if bearer is undefined
  if (typeof bearerHeader !== 'undefined') {
    // Split at space and extract token
    const token = bearerHeader.split(' ')[1];

    // Verify token against secret - if valid, decode it.
    jwt.verify(token, secret, (err, decoded: any) => {
      // If not, throw error.
      if (err) return res.status(403).json({ msg: 'Invalid token' });

      // Attach decoded user data to request object
      req.user = decoded;
      // Pass control to next middleware/handler
      next();
    });
  } else {
    res.sendStatus(403).json({ msg: 'Token was undefined.' });
  }
}
