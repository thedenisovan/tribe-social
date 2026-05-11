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
    // Check if follow request exists
    const request = await prismaNeon.followRequest.findFirst({
      where: { receiverId: intReceiverId, requesterId: intSenderId },
    });

    // Delete follow request
    if (request) {
      await prismaNeon.followRequest.deleteMany({
        where: { receiverId: intReceiverId, requesterId: intSenderId },
      });

      return res.status(200).json({ msg: 'follow request deleted.' });
      // Create follow request
    } else {
      await prismaNeon.followRequest.create({
        data: { receiverId: intReceiverId, requesterId: intSenderId },
      });

      return res.status(200).json({ msg: 'follow request sent.' });
    }
  } catch (e) {
    return next(e);
  }
}
