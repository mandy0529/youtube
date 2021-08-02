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
  githubStartLogin,
  githubFinisthLogin,
} from '../controllers/userController';
import {
  avatarUpload,
  noLoginUserAccess,
  onlyLoginUserAccess,
} from '../localsMiddleware';

const userRouter = express.Router();

userRouter.route('/login').all(noLoginUserAccess).get(getLogin).post(postLogin);
userRouter.route('/join').all(noLoginUserAccess).get(getJoin).post(postJoin);
userRouter
  .route('/edit/profile')
  .all(onlyLoginUserAccess)
  .get(getEditProfile)
  .post(avatarUpload.single('avatar'), postEditProfile);
userRouter
  .route('/change/password')
  .all(onlyLoginUserAccess)
  .get(getChangePassword)
  .post(postChangePassword);
userRouter.get('/logout', onlyLoginUserAccess, logout);
userRouter.get('/see/profile', onlyLoginUserAccess, profile);
userRouter.get('/github/start', githubStartLogin);
userRouter.get('/github/finish', githubFinisthLogin);

export default userRouter;
