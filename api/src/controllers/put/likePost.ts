import { Request, Response, NextFunction } from 'express';
import prismaNeon from '../../db/prisma.js';
import { HttpError } from '../../middleware/errorMiddleware.js';

export default async function likePost(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { postId, userId } = req.body;

  if (!postId || !userId) {
    next(new HttpError('Post id and user id must be provided', 400));
  }

  const intPostId = +postId;
  const intUserId = +userId;

  if (isNaN(intPostId) || isNaN(intUserId)) {
    next(new HttpError('Post id or user id isNaN', 400));
  }

  try {
    // Find like of given user on given post
    let msg = '';

    const like = await prismaNeon.likeOnPost.findFirst({
      where: { postId: intPostId, userId: intUserId },
    });

    // If like exits remove it
    if (like) {
      await prismaNeon.likeOnPost.deleteMany({
        where: { postId: like.postId, userId: intUserId },
      });

      msg = 'disliked';

      // If no like create it
    } else {
      await prismaNeon.likeOnPost.create({
        data: { userId: intUserId, postId: intPostId },
      });

      msg = 'liked';
    }

    const updatedPost = await prismaNeon.post.findUnique({
      where: { id: intPostId },
      include: { comments: true, hashtags: true, likes: true, saved: true },
    });

    return res.status(200).json({ msg, updatedPost });
  } catch (e) {
    next(e);
  }
}
