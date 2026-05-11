import prismaNeon from '../../db/prisma.js';
import { Request, Response, NextFunction } from 'express';
import { HttpError } from '../../middleware/errorMiddleware.js';

export default async function newPost(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { postData } = req.body;

  const authorIntId = Number(req.userId);

  if (!postData || !authorIntId || isNaN(authorIntId)) {
    return next(
      new HttpError(
        `No or incorrect values were provided for request body.`,
        400,
      ),
    );
  } else if (postData.trim() === '' || postData.trim().length >= 500) {
    return next(
      new HttpError(
        `Post data must be between one and 500 characters long.`,
        400,
      ),
    );
  }
  try {
    // Create new post
    const newPost = await prismaNeon.post.create({
      data: { postData: postData.trim(), authorId: authorIntId },
    });

    return res.status(201).json(newPost);
  } catch (e) {
    next(e);
  }
}

export async function savePost(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { postId } = req.body;

  const intUserId = Number(req.userId);
  const intPostId = Number(postId);

  if (!intPostId || isNaN(intUserId) || isNaN(intPostId)) {
    return next(
      new HttpError(
        `No or incorrect values were provided for request body.`,
        400,
      ),
    );
  }

  try {
    // Look if post is already saved by user
    const savedPost = await prismaNeon.savedPost.findFirst({
      where: { postId: intPostId, savedById: intUserId },
    });

    // If post is not saved save it, by creating new savedPost row
    if (!savedPost) {
      await prismaNeon.savedPost.create({
        data: { savedById: intUserId, postId: intPostId },
      });
    } else {
      await prismaNeon.savedPost.deleteMany({
        where: { savedById: intUserId, postId: intPostId },
      });
    }

    const savedPosts = await prismaNeon.post.findUnique({
      where: { id: intPostId },
      include: { comments: true, hashtags: true, likes: true, saved: true },
    });

    return res.status(201).json(savedPosts);
  } catch (e) {
    return next(e);
  }
}
