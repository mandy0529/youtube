export const localsMiddleware = (req, res, next) => {
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.loginUser = req.session.loginUser || {};
  console.log(req.session, 'loginuser');
  return next();
};

export const onlyLoginUserAccess = (req, res, next) => {
  if (req.session.loggedIn) {
    return next();
  } else {
    return res.redirect('/user/login');
  }
};

export const noLoginUserAccess = (req, res, next) => {
  if (!req.session.loggedIn) {
    return next();
  } else {
    return res.redirect('/');
  }
};
