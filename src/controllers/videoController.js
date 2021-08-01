import Video from '../models/Video';

export const home = async (req, res) => {
  const video = await Video.find({});
  return res.render('home', {pageTitle: 'Home', video});
};

export const watch = async (req, res) => {
  const {id} = req.params;
  const video = await Video.findById(id);
  return res.render('videos/watch', {pageTitle: `${video.title}`, video});
};

export const getUpload = async (req, res) => {
  return res.render('videos/upload', {pageTitle: 'upload new video'});
};
export const postUpload = async (req, res) => {
  const {title, description, hashtags} = req.body;
  const video = await Video.create({
    title,
    description,
    hashtags: Video.formatHashtags(hashtags),
  });
  return res.redirect('/');
};
export const search = async (req, res) => {
  const {title} = req.query;
  let videos = [];
  if (title) {
    videos = await Video.find({
      title: {
        $regex: new RegExp(title, 'i'),
      },
    });
  }
  return res.render('videos/search', {
    pageTitle: `search of video`,
    videos,
    errorMsg: `"${title ? title : ''}"에 대한 결과입니다.`,
  });
};

export const getEdit = async (req, res) => {
  const {id} = req.params;
  const video = await Video.findById(id);
  return res.render('videos/edit', {pageTitle: 'edit of video', video});
};
export const postEdit = async (req, res) => {
  const {id} = req.params;
  const {title, description, hashtags} = req.body;
  const video = await Video.findByIdAndUpdate(id, {
    title,
    description,
    hashtags: Video.formatHashtags(hashtags),
  });
  return res.redirect(`/video/${video.id}`);
};
export const deleteVideo = async (req, res) => {
  const {id} = req.params;
  await Video.findByIdAndDelete(id);
  return res.redirect('/');
};
