import Video from '../models/Video';
import User from '../models/User';

export const home = async (req, res) => {
  const video = await Video.find({});
  return res.render('home', {pageTitle: 'Home', video});
};

export const watch = async (req, res) => {
  const {id} = req.params;
  const video = await Video.findById(id).populate('owner');
  return res.render('videos/watch', {pageTitle: `${video.title}`, video});
};

export const getUpload = async (req, res) => {
  const {id} = req.params;
  const video = await Video.find(id);
  return res.render('videos/upload', {pageTitle: 'upload new video', video});
};
export const postUpload = async (req, res) => {
  const {
    session: {
      loginUser: {_id},
    },
    body: {title, description, hashtags},
    file,
  } = req;
  const newVideo = await Video.create({
    title,
    description,
    hashtags: Video.formatHashtags(hashtags),
    fileUrl: file.path,
    owner: _id,
  });
  const user = await User.findById(_id);
  user.videos.push(newVideo._id);
  user.save();
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
  const {
    loginUser: {_id},
  } = req.session;
  const video = await Video.findById(id);
  if (!video) {
    return res.status(404).render('videos/edit', {
      pageTitle: `Edit of video`,
      video,
      errorMsg: `video not found`,
    });
  }
  if (String(video.owner) !== String(_id)) {
    return res.status(403).redirect('/');
  }
  return res.render('videos/edit', {pageTitle: `Edit of video`, video});
};
export const postEdit = async (req, res) => {
  const {
    session: {
      loginUser: {_id},
    },
    params: {id},
    body: {title, description, hashtags},
  } = req;
  const video = await Video.findByIdAndUpdate(id, {
    title,
    description,
    hashtags: Video.formatHashtags(hashtags),
  });
  if (String(video.owner) !== String(_id)) {
    return res.render('videos/edit', {pageTitle: 'you are not owner'});
  }
  return res.redirect(`/video/${video.id}`);
};
export const deleteVideo = async (req, res) => {
  const {
    session: {
      loginUser: {_id},
    },
    params: {id},
  } = req;
  const video = await Video.findById(id);
  if (String(video.owner) !== String(_id)) {
    return res.redirect('/');
  }
  await Video.findByIdAndDelete(id);
  return res.redirect('/');
};
