import express from 'express';
import {
  home,
  getUpload,
  postUpload,
  search,
} from '../controllers/videoController';

const rootRouter = express.Router();

rootRouter.get('/', home);
rootRouter.route('/upload').get(getUpload).post(postUpload);
rootRouter.get('/search', search);

export default rootRouter;
