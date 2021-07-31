import mongoose from 'mongoose';

mongoose.connect('mongodb://127.0.0.1:27017/youtube', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

const handleOpen = () => console.log(`✅ connected to db`);
const handleError = (error) => console.log(`❌ disconnected to db`, error);

db.once('open', handleOpen);
db.on('error', handleError);
