import { Router } from 'express';
import { verifyToken } from '../middleware/jwt.js';
import getUsers from '../controllers/get/getUsers.js';
import sendFollowRequest from '../controllers/post/sendFollowRequest.js';
import acceptFollow from '../controllers/post/acceptFollow.js';
import unfollow from '../controllers/post/unfollow.js';
import { getFollowRequesters } from '../controllers/get/getUserData.js';

const discoverRoute = Router();

discoverRoute.get('/getUsers/:userId/:page', verifyToken, getUsers);
discoverRoute.get(
  '/getFollowRequesters/:userId',
  verifyToken,
  getFollowRequesters,
);

discoverRoute.post('/sendFollowRequest', verifyToken, sendFollowRequest);
discoverRoute.post('/acceptFollowRequest', verifyToken, acceptFollow);
discoverRoute.post('/unfollow', verifyToken, unfollow);

export default discoverRoute;
