import express from 'express';
import {
  watch,
  getEdit,
  postEdit,
  deleteVideo,
} from '../controllers/videoController';
import {onlyLoginUserAccess} from '../localsMiddleware';

const videoRouter = express.Router();

videoRouter.get('/:id([0-9a-f]{24})', watch);
videoRouter
  .route('/:id([0-9a-f]{24})/edit')
  .all(onlyLoginUserAccess)
  .get(getEdit)
  .post(postEdit);
videoRouter.get('/:id([0-9a-f]{24})/delete', onlyLoginUserAccess, deleteVideo);

export default videoRouter;
