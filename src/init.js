import 'dotenv/config';
import app from './server';
import './db';
import './models/Video';
import './models/User';
import './models/Comment';

const PORT = 5000;

app.listen(PORT, () =>
  console.log(`✅listening for your server http://localhost:${PORT}`)
);
