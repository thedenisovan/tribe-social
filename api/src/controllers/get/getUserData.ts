import prismaNeon from '../../db/prisma.js';
import { Request, Response, NextFunction } from 'express';
import { HttpError } from '../../middleware/errorMiddleware.js';

export default async function getUserPosts(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { authorId } = req.params;

    if (!authorId) {
      return next(new HttpError(`No author id provided.`, 400));
    }

    const authorIntId = Number(authorId);

    if (!authorIntId || isNaN(authorIntId)) {
      return next(
        new HttpError(
          `No or incorrect values were provided for request body.`,
          400,
        ),
      );
    }

    // Get all posts created by user
    const posts = await prismaNeon.post.findMany({
      where: { authorId: authorIntId },
      include: { likes: true, saved: true, comments: true, hashtags: true },
    });

    return res.status(201).json(posts);
  } catch (e) {
    next(e);
  }
}

export async function getPost(req: Request, res: Response, next: NextFunction) {
  try {
    const { postId } = req.params;

    if (!postId) {
      return next(new HttpError(`No post id provided.`, 400));
    }

    const postIntId = Number(postId);

    if (isNaN(postIntId)) {
      return next(
        new HttpError(
          `No or incorrect values were provided for request body.`,
          400,
        ),
      );
    }

    // Get single post
    const posts = await prismaNeon.post.findUnique({
      where: { id: postIntId },
      include: { likes: true, saved: true, comments: true, hashtags: true },
    });

    return res.status(201).json(posts);
  } catch (e) {
    next(e);
  }
}

export async function getUserProfileData(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { userId } = req.params;

    if (!userId) {
      return next(new HttpError(`No author id provided.`, 400));
    }

    const intUserId = Number(userId);

    if (!intUserId || isNaN(intUserId)) {
      return next(
        new HttpError(
          `No or incorrect values were provided for request body.`,
          400,
        ),
      );
    }

    // Get all data of given user
    const userData = await prismaNeon.user.findUnique({
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

    return res.status(201).json(userData);
  } catch (e) {
    next(e);
  }
}
