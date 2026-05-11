import { Request, Response, NextFunction } from 'express';
import { HttpError } from '../../middleware/errorMiddleware.js';
import prismaNeon from '../../db/prisma.js';

export default async function getUsers(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { page } = req.params;

  if (!page || isNaN(+page)) {
    next(new HttpError(`No inputs provided.`, 400));
  }

  const intPage = Number(page);
  const intUserId = Number(req.userId);

  if (intPage < 0) {
    next(new HttpError(`Invalid page, must be positive int.`, 400));
  }

  try {
    // Get ten users based ordered by id
    const users = await prismaNeon.user.findMany({
      where: { id: { not: intUserId } },
      orderBy: {
        id: 'asc',
      },
      // Start page 0 so skip 0 and return first 10
      skip: intPage * 10,
      take: 10,
      include: {
        receiver: true,
        requester: true,
        follower: true,
        following: true,
      },
    });

    return res.status(200).json(users);
  } catch (e) {
    next(e);
  }
}
