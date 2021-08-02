import mongoose from 'mongoose';

const videoSchema = mongoose.Schema({
  title: {type: String, required: true, trim: true},
  description: {type: String, required: true, trim: true},
  hashtags: [{type: String, required: true, trim: true}],
  views: {type: Number, default: 0, trim: true, required: true},
  createdAt: {type: Date, default: Date.now, trim: true, required: true},
  fileUrl: {type: String, required: true},
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
});

videoSchema.static('formatHashtags', function (hashtags) {
  return hashtags
    .split(',')
    .map((word) => (word.startsWith('#') ? word : `#${word}`));
});
const Video = mongoose.model('Video', videoSchema);

export default Video;
