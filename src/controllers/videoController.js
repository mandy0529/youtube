import Video from '../models/Video';

export const home = async (req, res) => {
  const video = await Video.find({});
  console.log(video, '이건 비디오');
  res.render('home', {pageTitle: 'Home', video});
};

export const watch = (req, res) => {
  res.render('videos/watch');
};

export const getUpload = async (req, res) => {
  const {id} = req.params;
  res.render('videos/upload', {pageTitle: 'upload new video'});
};
export const postUpload = async (req, res) => {
  const {title, description, hashtags} = req.body;
  const video = await Video.create({
    title,
    description,
    hashtags,
  });
  res.render('videos/upload', {pageTitle: 'upload new video', video});
};
export const search = (req, res) => {
  res.render('videos/search');
};

export const getEdit = (req, res) => {
  res.render('videos/edit');
};
export const postEdit = (req, res) => {
  res.redirect('/');
};
export const deleteVideo = (req, res) => {
  res.redirect('/');
};
