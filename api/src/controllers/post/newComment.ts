import prismaNeon from '../../db/prisma.js';
import { Request, Response, NextFunction } from 'express';
import { HttpError } from '../../middleware/errorMiddleware.js';

export default async function newComment(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { postId, authorId, comment } = req.body;

    const intAuthorId = Number(authorId);
    const intPostId = Number(postId);

    if (
      !comment ||
      !intAuthorId ||
      !postId ||
      isNaN(intPostId) ||
      isNaN(intAuthorId)
    ) {
      return next(
        new HttpError(
          `No or incorrect values were provided for request body.`,
          400,
        ),
      );
    } else if (comment.trim() === '' || comment.trim().length >= 50) {
      return next(
        new HttpError(
          `Post data must be between one and 50 characters long.`,
          400,
        ),
      );
    }

    // Create new comment
    await prismaNeon.commentOnPost.create({
      data: { comment, postId: intPostId, authorId: intAuthorId },
    });

    // Post on which comment was written
    const updatedPost = await prismaNeon.post.findUnique({
      where: { id: intPostId },
    });

    const updatedPosts = await prismaNeon.post.findMany({
      where: { authorId: updatedPost?.authorId },
      include: { comments: true, hashtags: true, likes: true, saved: true },
    });
    return res.status(201).json(updatedPosts);
  } catch (e) {
    return next(e);
  }
}
