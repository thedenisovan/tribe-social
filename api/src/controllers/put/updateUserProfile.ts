import { Request, Response, NextFunction } from 'express';
import { HttpError } from '../../middleware/errorMiddleware.js';
import prismaNeon from '../../db/prisma.js';
import bcrypt from 'bcryptjs';

export default async function updateUserDetails(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { firstName, lastName, bio, password } = req.body;

  if (!firstName && !lastName && !bio && !password) {
    next(new HttpError('At least one input field must be provided.', 400));
  } else if (bio && bio.length > 200) {
    next(new HttpError('Bio must be no longer than 200 characters', 400));
  }

  const intUserId = Number(req.userId);

  try {
    let user = await prismaNeon.user.findUnique({
      where: { id: intUserId },
      include: {
        posts: true,
        savedPosts: true,
        follower: true,
        following: true,
        requester: true,
        receiver: true,
        likedComments: true,
        likedPosts: true,
        comments: true,
      },
    });

    await prismaNeon.user.update({
      where: { id: intUserId },
      data: {
        firstName: firstName || user?.firstName,
        lastName: lastName || user?.lastName,
        bio: bio || user?.bio,
        hashedPassword: password
          ? await bcrypt.hash(password, 10)
          : user?.hashedPassword,
      },
    });

    user = await prismaNeon.user.findUnique({
      where: { id: intUserId },
      include: {
        posts: true,
        savedPosts: true,
        follower: true,
        following: true,
        requester: true,
        receiver: true,
        likedComments: true,
        likedPosts: true,
        comments: true,
      },
    });

    return res.status(200).json({ errors: [], user });
  } catch (e) {
    next(e);
  }
}
