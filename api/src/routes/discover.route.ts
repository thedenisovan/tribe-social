import { Router } from 'express';
import { verifyToken } from '../middleware/jwt.js';
import getUsers from '../controllers/get/getUsers.js';

const discoverRoute = Router();

discoverRoute.get('/getUsers/:userId/:page', verifyToken, getUsers);

export default discoverRoute;
