import { Request, Response, NextFunction } from 'express';
import { HttpError } from '../../middleware/errorMiddleware.js';
import prismaNeon from '../../db/prisma.js';
import { prismaUserSearch } from './sendFollowRequest.js';

export default async function unfollow(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { following } = req.body;

  if (!following) {
    next(new HttpError('Provide follower and following ids', 400));
  }

  const intFollowerId = Number(req.userId);
  const intFollowingId = Number(following);

  if (isNaN(intFollowerId) || isNaN(intFollowingId)) {
    next(new HttpError('Follower ids must be number numbers', 400));
  }

  try {
    const relationship = await prismaNeon.follow.findFirst({
      where: { followerId: intFollowerId, followingId: intFollowingId },
    });

    if (relationship) {
      await prismaNeon.follow.deleteMany({
        where: { followerId: intFollowerId, followingId: intFollowingId },
      });

      const users = await prismaUserSearch(intFollowerId);

      return res.status(200).json({ msg: 'unfollowed', users });
    }

    return res.status(501).json({ msg: 'not implemented' });
  } catch (e) {
    return next(e);
  }
}
