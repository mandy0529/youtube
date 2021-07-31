import app from './server';
import './models/Video';
import './models/User';
import './models/Comment';

const PORT = 5000;

app.listen(PORT, () =>
  console.log(`listening for your server http://localhost:${PORT}`)
);
