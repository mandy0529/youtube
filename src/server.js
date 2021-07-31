import express from 'express';
import './db';

import rootRouter from './routers/rootRouter';
import userRouter from './routers/userRouter';
import videoRouter from './routers/videoRouter';

const app = express();

app.set('view engine', 'pug');
app.set('views', process.cwd() + '/src/views');
app.use(express.urlencoded({extended: true}));

app.use('/', rootRouter);
app.use('/user', userRouter);
app.use('/video', videoRouter);

export default app;
