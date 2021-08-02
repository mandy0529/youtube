import express from 'express';
import {
  home,
  getUpload,
  postUpload,
  search,
} from '../controllers/videoController';
import {onlyLoginUserAccess, videoUpload} from '../localsMiddleware';

const rootRouter = express.Router();

rootRouter.get('/', home);
rootRouter
  .route('/upload')
  .all(onlyLoginUserAccess)
  .get(getUpload)
  .post(videoUpload.single('video'), postUpload);
rootRouter.get('/search', search);

export default rootRouter;
