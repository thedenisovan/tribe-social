import { Request, Response, NextFunction } from 'express';
import { HttpError } from '../../middleware/errorMiddleware.js';
import prismaNeon from '../../db/prisma.js';
import { prismaUserSearch } from './sendFollowRequest.js';

export default async function acceptFollow(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { senderId, isAccepted } = req.body;

  if (!senderId) {
    return next(new HttpError('No sender id or receiver id provided.', 400));
  }

  const intSenderId = Number(senderId);
  const intReceiverId = Number(req.userId);

  if (isNaN(intSenderId) || isNaN(intReceiverId)) {
    return next(
      new HttpError('Sender id or/and receiver id is/are NaN format.', 400),
    );
  }

  try {
    let users;

    // Check if follow request exists
    const request = await prismaNeon.followRequest.findFirst({
      where: { receiverId: intReceiverId, requesterId: intSenderId },
    });

    // If a follow request is accepted:
    // 1. Remove the pending request
    // 2. Create the follower relationship
    if (request && isAccepted) {
      await prismaNeon.followRequest.deleteMany({
        where: { receiverId: intReceiverId, requesterId: intSenderId },
      });

      await prismaNeon.follow.create({
        data: { followerId: intSenderId, followingId: intReceiverId },
      });

      users = await prismaUserSearch(intReceiverId);

      return res.status(200).json({ msg: 'follow request accepted.', users });
      // If a follow request is declined:
      // 1. Remove the pending request
    } else if (request && !isAccepted) {
      await prismaNeon.followRequest.deleteMany({
        where: { receiverId: intReceiverId, requesterId: intSenderId },
      });

      users = await prismaUserSearch(intReceiverId);

      return res.status(200).json({ msg: 'follow request declined.', users });
    }

    return res.status(501).json({ msg: 'unexpected e.' });
  } catch (e) {
    return next(e);
  }
}
