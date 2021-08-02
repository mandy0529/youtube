import express from 'express';
import logger from 'morgan';
import session from 'express-session';
import {localsMiddleware} from './localsMiddleware';
import mongoStore from 'connect-mongo';

import rootRouter from './routers/rootRouter';
import userRouter from './routers/userRouter';
import videoRouter from './routers/videoRouter';
import apiRouter from './routers/apiRouter';

const app = express();

app.set('view engine', 'pug');
app.set('views', process.cwd() + '/src/views');
app.use(express.urlencoded({extended: true}));
app.use(
  session({
    secret: process.env.DB_SECRET,
    resave: false,
    saveUninitialized: false,
    store: mongoStore.create({mongoUrl: process.env.DB_URL}),
  })
);
app.use(logger('dev'));
app.use(localsMiddleware);
app.use('/uploads', express.static('uploads'));
app.use(express.static('src/static'));
app.use('/', rootRouter);
app.use('/user', userRouter);
app.use('/video', videoRouter);
app.use('/api', apiRouter);

export default app;
