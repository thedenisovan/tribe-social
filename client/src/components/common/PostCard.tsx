import { isToday, differenceInDays, differenceInYears } from 'date-fns';
import { useState, useContext } from 'react';
import { Link } from 'react-router';

import deletePost from '../../services/deletePost.client';
import savePost from '../../services/savePost.client';
import newComment from '../../services/newComment.client';
import likePost from '../../services/likePost.client';

import type { Comment, FullUser, Post, SavedPost } from '../../types/auth';

import { LoadingSvg } from '../../pages/auth/components/AuthForm';

import ICONS from '../../constants/icons';
import DashContext from '../../context/DashContext';

type PostCardProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  userData: FullUser | any;
  currUserId: number;
  postData: Post;
  isUserPosts: boolean;

  setUserPosts: React.Dispatch<React.SetStateAction<Post[]>>;
  setSavedPosts: React.Dispatch<React.SetStateAction<Post[]>>;
};

export default function PostCard({
  userData,
  currUserId,
  postData,
  isUserPosts,
  setUserPosts,
  setSavedPosts,
}: PostCardProps) {
  // Id of signed in user
  const uid = useContext(DashContext)?.fullUser?.id;

  const [post, setPost] = useState(postData);

  const [isLikeLoading, setIsLikeLoading] = useState(false);
  const [isCommentOpen, setIsCommentOpen] = useState(false);

  const isPostLiked = post.likes.some((like) => like.userId === currUserId);

  const isPostSaved = post.saved.some(
    (saved) => saved.savedById === currUserId,
  );

  // Only author can delete his posts
  const canDelete = post.authorId === currUserId;

  // Only user can save/unsave posts to his profile
  const canSave = uid === currUserId && currUserId !== post.authorId;

  async function handleDeletePost() {
    const posts = await deletePost(post.id, post.authorId);

    setUserPosts(posts);
  }

  async function handleLikePost() {
    setIsLikeLoading(true);

    const res = await likePost(post.id, currUserId);

    const updatedPost = res.updatedPosts.find((p: Post) => p.id === post.id);

    if (!updatedPost) return;

    setPost(updatedPost);

    if (isUserPosts) {
      setUserPosts(res.updatedPosts);
    } else {
      const normalizedPosts = res.savedPosts.map(
        (saved: SavedPost) => saved.post,
      );

      setSavedPosts(normalizedPosts);
    }

    setIsLikeLoading(false);
  }

  async function handleSavePost() {
    const updatedPost = await savePost(post.id, currUserId);

    setPost(updatedPost);
  }

  return (
    <div className='border border-neutral-300 dark:border-neutral-600 dark:bg-neutral-600/20 rounded-xl p-3 my-4!'>
      <main>
        <header className='flex justify-between'>
          <Link to={`/dashboard/profile/${post.authorId}`}>
            <div className='flex items-center gap-1'>
              <aside>
                {userData.avatarUrl ? (
                  userData.avatarUrl
                ) : (
                  <div className='flex items-center justify-center md:h-10 md:w-10 rounded-full bg-linear-to-br from-purple-500 to-pink-500 p-1'>
                    <p className='text-sm text-white'>
                      {userData.firstName[0].toUpperCase()}
                    </p>

                    <p className='text-sm text-white'>
                      {userData.lastName[0].toUpperCase()}
                    </p>
                  </div>
                )}
              </aside>

              <div>
                <h2 className='flex gap-1'>
                  <span className='font-medium'>{userData.firstName}</span>

                  <span className='font-medium'>{userData.lastName}</span>
                </h2>

                <div className='flex items-center gap-1 flex-wrap'>
                  <p className='text-[13px] dark:text-neutral-300'>
                    @{userData.email}
                  </p>

                  {'•'}

                  <p className='text-[13px] dark:text-neutral-300'>
                    {formatPostDate(post.createdAt)}
                  </p>
                </div>
              </div>
            </div>
          </Link>

          <button
            onClick={handleDeletePost}
            className={`
              h-7 w-7 rounded-full flex items-center justify-center
              transition-colors cursor-pointer hover:bg-red-500/50
              ${canDelete ? '' : 'hidden'}
            `}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              height='24px'
              width='24px'
              viewBox='0 -960 960 960'
              fill='#999999'
            >
              <path d={ICONS.delete} />
            </svg>
          </button>
        </header>

        <p className='mt-5!'>{post.postData}</p>

        <footer className='flex gap-2'>
          <div className='flex gap-2'>
            <button
              id={`b-${post.id}`}
              onClick={handleLikePost}
              className={`
                border rounded-2xl p-2 flex
                ${isPostLiked ? 'bg-red-500' : ''}
              `}
            >
              Likes {!isLikeLoading ? post.likes.length : <LoadingSvg />}
            </button>

            <button
              onClick={() => setIsCommentOpen((prev) => !prev)}
              className='border rounded-2xl p-2'
            >
              comments {post.comments.length}
            </button>

            <button
              onClick={handleSavePost}
              className={`
                border rounded-2xl p-2
                ${canSave ? '' : 'hidden'}
                ${isPostSaved ? 'bg-blue-500' : ''}
              `}
            >
              save
            </button>
          </div>
        </footer>
        <CommentDropDown
          isCommentOpen={isCommentOpen}
          comments={post.comments}
          userId={currUserId}
          postId={post.id}
          setPost={setPost}
          setUserPosts={setUserPosts}
        />
      </main>
    </div>
  );
}

type CommentDropDownProps = {
  isCommentOpen: boolean;
  comments: Comment[];
  userId: number;
  postId: number;

  setPost: React.Dispatch<React.SetStateAction<Post>>;
  setUserPosts: React.Dispatch<React.SetStateAction<Post[]>>;
};

function CommentDropDown({
  isCommentOpen,
  comments,
  userId,
  postId,
  setPost,
  setUserPosts,
}: CommentDropDownProps) {
  const [comment, setComment] = useState('');

  async function handleNewComment() {
    const updatedPosts = await newComment(comment, postId, userId);

    const updatedPost = updatedPosts.find((post: Post) => post.id === postId);

    if (!updatedPost) return;

    setPost(updatedPost);
    setUserPosts(updatedPosts);
  }

  return (
    <div
      className='flex-col'
      style={{ display: isCommentOpen ? 'flex ' : 'none' }}
    >
      <form onSubmit={(e) => e.preventDefault()}>
        <label htmlFor='comment'>Comment</label>

        <input
          id='comment'
          name='comment'
          type='text'
          minLength={1}
          maxLength={50}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className='border'
        />

        <button onClick={handleNewComment}>Post</button>
      </form>

      <ul>
        {comments.map((comment) => (
          <li key={comment.commentId}>{comment.comment}</li>
        ))}
      </ul>
    </div>
  );
}

function formatPostDate(date: string | Date) {
  const parsedDate = new Date(date);

  if (isToday(parsedDate)) {
    return 'today';
  }

  const days = differenceInDays(new Date(), parsedDate);

  if (days < 365) {
    return `${days + 1}d`;
  }

  const years = differenceInYears(new Date(), parsedDate);

  return `${years + 1}y`;
}
