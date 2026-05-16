import { Request, Response, NextFunction } from 'express';
import { HttpError } from '../../middleware/errorMiddleware.js';
import prismaNeon from '../../db/prisma.js';

export default async function getPosts(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  // Integer representing which pages to retrieve from db and display to user
  const paginationNum =
    req.query.paginationNum === undefined ? 0 : Number(req.query.paginationNum);
  // Boolean value deciding to display global posts or friends posts
  const isGlobalPosts = req.query.isGlobalPosts !== 'false';
  const intUserId = Number(req.userId);

  if (isNaN(intUserId)) {
    return next(new HttpError('User id is NaN format.', 400));
  }

  if (isNaN(paginationNum) || paginationNum < 0) {
    return next(new HttpError('Invalid pagination number.', 400));
  }

  try {
    const following = isGlobalPosts
      ? []
      : await prismaNeon.follow.findMany({
          where: { followerId: intUserId },
          select: { followingId: true },
        });

    const followingIds = following.map((follow) => follow.followingId);

    const posts = await prismaNeon.post.findMany({
      where: {
        authorId: isGlobalPosts
          ? { not: intUserId }
          : { in: followingIds, not: intUserId },
      },
      orderBy: [{ createdAt: 'desc' }, { id: 'desc' }],
      skip: paginationNum * 10,
      take: 10,
      include: {
        likes: true,
        saved: true,
        comments: true,
        hashtags: true,
        author: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            avatarUrl: true,
          },
        },
      },
    });

    return res.status(200).json(posts);
  } catch (e) {
    return next(e);
  }
}
