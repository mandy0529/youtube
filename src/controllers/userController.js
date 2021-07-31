export const getLogin = (req, res) => {
  res.render('users/login');
};

export const postLogin = (req, res) => {
  res.redirect('/');
};

export const getJoin = (req, res) => {
  res.render('users/join');
};

export const postJoin = (req, res) => {
  res.render('users/join');
};

export const getEditProfile = (req, res) => {
  res.render('users/editProfile');
};

export const postEditProfile = (req, res) => {
  res.redirect('/');
};

export const getChangePassword = (req, res) => {
  res.render('/users/changePassword');
};

export const postChangePassword = (req, res) => {
  res.redirect('/logout');
};

export const logout = (req, res) => {
  res.redirect('/');
};

export const profile = (req, res) => {
  res.render('users/profile');
};
