import { NextFunction, Request, Response } from 'express';
import prismaNeon from '../db/prisma.js';
import bcrypt from 'bcryptjs';
import { error } from 'node:console';

export default async function registerUser(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const user = await prismaNeon.user.create({
      data: {
        firstName,
        lastName,
        email,
        hashedPassword: await bcrypt.hash(password, 10),
      },
    });

    if (user) {
      return res.json({
        isUserCreated: true,
        errors: [],
      });
    } else {
      return res.status(401).json({ isUserCreated: false, errors: [] });
    }
  } catch (e) {
    next(e);
  }
}
