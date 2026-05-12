import { Request, Response, NextFunction } from 'express';
import { HttpError } from '../../middleware/errorMiddleware.js';
import prismaNeon from '../../db/prisma.js';

export default async function sendFollowRequest(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { receiverId } = req.body;

  if (!receiverId) {
    return next(new HttpError('No sender id or receiver id provided.', 400));
  }

  const intSenderId = Number(req.userId);
  const intReceiverId = Number(receiverId);

  if (isNaN(intSenderId) || isNaN(intReceiverId)) {
    return next(
      new HttpError('Sender id or/and receiver id is/are NaN format.', 400),
    );
  }

  try {
    // Get ten users based ordered by id
    let users;

    // Check if follow request exists
    const request = await prismaNeon.followRequest.findFirst({
      where: { receiverId: intReceiverId, requesterId: intSenderId },
    });

    // Delete follow request
    if (request) {
      await prismaNeon.followRequest.deleteMany({
        where: { receiverId: intReceiverId, requesterId: intSenderId },
      });

      users = await prismaUserSearch(intSenderId);

      return res.status(200).json({ msg: 'follow request deleted.', users });
      // Create follow request
    } else {
      await prismaNeon.followRequest.create({
        data: { receiverId: intReceiverId, requesterId: intSenderId },
      });

      users = await prismaUserSearch(intSenderId);

      return res.status(200).json({ msg: 'follow request sent.', users });
    }
  } catch (e) {
    return next(e);
  }
}

// Prisma query to get 10 users based on current page of the pagination
export async function prismaUserSearch(id: number) {
  return await prismaNeon.user.findMany({
    where: { id: { not: id } },
    orderBy: {
      id: 'asc',
    },
    // Start page 0 so skip 0 and return first 10
    skip: 0 * 10,
    take: 10,
    include: prismaSearch,
  });
}

export const prismaSearch = {
  receiver: true,
  requester: true,
  follower: true,
  following: true,
};
