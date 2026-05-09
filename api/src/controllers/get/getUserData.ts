import prismaNeon from '../../db/prisma.js';
import { Request, Response, NextFunction } from 'express';
import { HttpError } from '../../middleware/errorMiddleware.js';

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
        posts: {
          include: {
            likes: true,
            saved: true,
            comments: true,
            hashtags: true,
          },
        },
        savedPosts: {
          select: {
            post: {
              include: {
                likes: true,
                saved: true,
                comments: true,
                hashtags: true,
                author: {
                  select: {
                    firstName: true,
                    lastName: true,
                    email: true,
                    avatarUrl: true,
                  },
                },
              },
            },
          },
        },
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
