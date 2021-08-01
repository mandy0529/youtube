import mongoose from 'mongoose';

mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const db = mongoose.connection;

const handleOpen = () => console.log(`✅ connected to db`);
const handleError = (error) => console.log(`❌ disconnected to db`, error);

db.once('open', handleOpen);
db.on('error', handleError);
