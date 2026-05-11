import { Request, Response, NextFunction } from 'express';
import prismaNeon from '../../db/prisma.js';
import { HttpError } from '../../middleware/errorMiddleware.js';

export default async function likePost(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { postId } = req.body;

  if (!postId) {
    next(new HttpError('Post id and user id must be provided', 400));
  }

  const intPostId = +postId;
  const intUserId = req.userId;

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

    // Liked posts
    const updatedPost = await prismaNeon.post.findUnique({
      where: { id: intPostId },
      include: { comments: true, hashtags: true, likes: true, saved: true },
    });

    // All posts of user who's posts been liked
    const updatedPosts = await prismaNeon.post.findMany({
      where: { authorId: updatedPost?.authorId },
      include: {
        comments: true,
        hashtags: true,
        likes: true,
        saved: true,
        author: true,
      },
    });

    const savedPosts = await prismaNeon.savedPost.findMany({
      where: { savedById: intUserId },
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
    });

    return res.status(200).json({ msg, updatedPosts, savedPosts });
  } catch (e) {
    next(e);
  }
}
