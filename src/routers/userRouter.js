import express from 'express';
import {
  getLogin,
  postLogin,
  getJoin,
  postJoin,
  getEditProfile,
  postEditProfile,
  getChangePassword,
  postChangePassword,
  logout,
  profile,
} from '../controllers/userController';

const userRouter = express.Router();

userRouter.route('/login').get(getLogin).post(postLogin);
userRouter.route('/join').get(getJoin).post(postJoin);
userRouter.route('/edit/profile').get(getEditProfile).post(postEditProfile);
userRouter
  .route('/change/password')
  .get(getChangePassword)
  .post(postChangePassword);
userRouter.get('/logout', logout);
userRouter.get('/see/profile', profile);

export default userRouter;
