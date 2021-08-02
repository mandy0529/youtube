import User from '../models/User';
import bcrypt from 'bcrypt';
import fetch from 'node-fetch';

export const getLogin = (req, res) => {
  return res.render('users/login', {pageTitle: 'login'});
};

export const postLogin = async (req, res) => {
  const {username, password} = req.body;
  const dbUser = await User.findOne({username});
  const ok = await bcrypt.compare(password, dbUser.password);
  if (!dbUser) {
    return res.render('users/login', {
      pageTitle: 'login',
      errorMsg: 'this username does not exist',
    });
  }
  if (!ok) {
    return res.render('users/login', {
      pageTitle: 'login',
      errorMsg: 'wrong password',
    });
  }
  req.session.loggedIn = true;
  req.session.loginUser = dbUser;
  return res.redirect('/');
};

export const getJoin = (req, res) => {
  return res.render('users/join', {pageTitle: 'new user join'});
};

export const postJoin = async (req, res) => {
  const {username, password, email, location, password2} = req.body;
  const existUser = await User.exists({$or: [{username}, {email}]});
  if (existUser) {
    return res.render('users/join', {
      pageTitle: 'new user join',
      errorMsg: 'already taken this username/email',
    });
  }
  if (password !== password2) {
    return res.render('users/join', {
      pageTitle: 'new user join',
      errorMsg: 'passwords do not match each other',
    });
  }
  await User.create({
    username,
    password,
    password2,
    email,
    location,
  });
  return res.redirect('/user/login');
};

export const getEditProfile = (req, res) => {
  return res.render('users/editProfile', {pageTitle: 'edit of profile'});
};

export const postEditProfile = async (req, res) => {
  const {
    session: {
      loginUser: {_id, username: sessionUsername, email: sessionEmail},
    },
    body: {username, email, location},
    file,
  } = req;
  console.log(sessionUsername, '세션 유저네임');
  console.log(username, '유저네임');
  if (sessionUsername !== username || sessionEmail !== email) {
    const user = await User.exists({$or: [{username}, {email}]});
    if (user) {
      return res.render('users/editProfile', {
        pageTitle: 'edit profile',
        errorMsg: 'this username/email is already exist',
      });
    }
  }
  const updateUser = await User.findByIdAndUpdate(
    _id,
    {
      username,
      email,
      location,
      avatarUrl: file ? file.path : avatarUrl,
    },
    {new: true}
  );
  req.session.loginUser = updateUser;
  return res.redirect('/');
};

export const getChangePassword = (req, res) => {
  return res.render('users/changePassword', {pageTitle: 'change password'});
};

export const postChangePassword = async (req, res) => {
  const {
    session: {
      loginUser: {_id},
    },
    body: {oldPassword, newPassword, newPassword2},
  } = req;
  const user = await User.findById(_id);
  const ok = await bcrypt.compare(oldPassword, user.password);
  if (!ok) {
    return res.render('users/changePassword', {
      pageTitle: 'change password',
      errorMsg: 'wrong password',
    });
  }
  if (newPassword !== newPassword2) {
    return res.render('users/changePassword', {
      pageTitle: 'change password',
      errorMsg: 'password does not match',
    });
  }
  user.password = newPassword;
  await user.save();
  return res.redirect('/user/logout');
};

export const logout = (req, res) => {
  req.session.destroy();
  return res.redirect('/user/login');
};

export const profile = async (req, res) => {
  const {
    session: {
      loginUser: {_id},
    },
  } = req;
  const user = await User.findById(_id).populate('videos');
  if (!user) {
    return res.render('users/profile', {
      pageTitle: 'user not found',
      errorMsg: 'user not found',
    });
  }
  console.log(user, '이것은 유저입니다');
  return res.render('users/profile', {pageTitle: 'my profile', user});
};

export const githubStartLogin = (req, res) => {
  const baseUrl = 'https://github.com/login/oauth/authorize';
  const config = {
    client_id: process.env.GH_CLIENT,
    allow_signup: false,
    scope: 'read:user user:email',
  };
  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${params}`;
  return res.redirect(finalUrl);
};

export const githubFinisthLogin = async (req, res) => {
  const baseUrl = 'https://github.com/login/oauth/access_token';
  const config = {
    client_id: process.env.GH_CLIENT,
    client_secret: process.env.GH_SECRET,
    code: req.query.code,
  };
  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${params}`;
  const tokenRequest = await (
    await fetch(finalUrl, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
    })
  ).json();
  if ('access_token' in tokenRequest) {
    const {access_token} = tokenRequest;
    const apiUrl = 'https://api.github.com';
    const userData = await (
      await fetch(`${apiUrl}/user`, {
        headers: {
          Authorization: `token ${access_token}`,
        },
      })
    ).json();
    const emailData = await (
      await fetch(`${apiUrl}/user/emails`, {
        headers: {
          Authorization: `token ${access_token}`,
        },
      })
    ).json();
    const emailObj = emailData.find(
      (email) => email.primary === true && email.verified === true
    );
    let existUser = await User.findOne({email: emailObj.email});
    if (!existUser) {
      existUser = await User.create({
        username: userData.name,
        password: '',
        email: emailObj.email,
        location: userData.location,
        socialLoginOnly: true,
      });
    }
    req.session.loggedIn = true;
    req.session.loginUser = existUser;
    return res.redirect('/');
  } else {
    return res.redirect('/user/login');
  }
};
