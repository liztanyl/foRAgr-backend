import dotenv from 'dotenv';
import { google } from 'googleapis';

import axios from 'axios';
import jwt from 'jsonwebtoken';

const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:19006';
dotenv.config();

const oauth2Client = new google.auth.OAuth2(
  process.env.OAUTH_CLIENT_ID,
  process.env.OAUTH_CLIENT_SECRET,
  `${FRONTEND_URL}/auth/google`
);

function getGoogleAuthURLHelper() {
  const scopes = [
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/userinfo.email',
  ];

  return oauth2Client.generateAuthUrl({
    access_type: 'offline',
    prompt: 'consent',
    scope: scopes,
  });
}

// VERIFICATION MIDDLEWARE
export const verifyLoggedInUser = (req, res, next) => {
  try {
    const noVerifyPaths = [
      '/user/logout',
      '/user/getGoogleAuthUrl',
      '/user/getAccessToken',
    ];
    const { token } = req.cookies;
    if (noVerifyPaths.includes(req.path)) {
      next();
    } else {
      const { email } = jwt.verify(token, process.env.JWT_SECRET_KEY);
      if (email) {
        next();
      }
    }
  } catch (err) {
    console.log(err);
    res.status(401).send('No Access');
    // REDIRECT TO LOGIN PAGE
    // (useEffect on all components on frontend to redirect to login page on err.res.status of 401)
  }
};

export default function initUserController(db) {
  const getGoogleAuthUrl = async (req, res) => {
    try {
      const url = getGoogleAuthURLHelper();
      res.send(url);
    } catch (err) {
      console.log(err);
    }
  };

  const userDataToDb = async (userData) => {
    try {
      const { email, name, picture } = userData;
      const givenName = userData.given_name;
      const familyName = userData.family_name;

      // Package google user data as a jwt, then send as a cookie
      const token = jwt.sign(userData, process.env.JWT_SECRET_KEY);
      console.log(token);

      // CHECK DB FOR EXISTING USERS
      const existingUser = await db.User.findOne({
        where: {
          email,
          name,
          givenName,
          familyName,
          picture,
        },
      });

      if (existingUser) {
        return {
          userData: existingUser,
          newUser: false,
          token,
        };
      }

      const newUser = await db.User.create({
        email,
        name,
        givenName,
        familyName,
        picture,
      });

      return {
        userData: newUser,
        newUser: true,
        token,
      };
    } catch (err) {
      console.log(err);
    }
  };

  const getAccessToken = async (req, res) => {
    try {
      const { authCode } = req.body;

      if (authCode) {
        const { tokens } = await oauth2Client.getToken(authCode);
        const googleUser = await axios
          .get(
            `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${tokens.access_token}`,
            {
              headers: {
                Authorization: `Bearer ${tokens.id_token}`,
              },
            }
          )
          .then((response) => response.data)
          .catch((error) => {
            throw new Error(error.message);
          });

        console.log(googleUser);
        const { newUser, token } = userDataToDb(googleUser);
        if (newUser) {
          res.cookie('token', token);
          res.cookie('logged_in_user', JSON.stringify(googleUser));
          res.send('New user registered');
        } else {
          res.cookie('token', token);
          res.cookie('logged_in_user', JSON.stringify(googleUser));
          res.send('Logged in existing user');
        }
      } else {
        res.status(401).send('Invalid login');
      }
    } catch (err) {
      console.log(err);
      res.status(401).send('Invalid login');
    }
  };

  const loginMobile = async (req, res) => {
    try {
      console.log('LOGIN MOBILE');
      console.log(req.body);
      const googleUser = req.body;
      const userData = await userDataToDb(googleUser);
      console.log('USER DATA FROM DB');
      console.log(userData);

      console.log(
        'SENDING USER DATA TO FRONTEND AFTER COMPLETING BE VERIFICATION'
      );
      res.send(userData);
    } catch (err) {
      console.log(err);
    }
  };

  const logout = (req, res) => {
    try {
      res.clearCookie('token');
      res.clearCookie('logged_in_user');
      res.send('Successful logout');
    } catch (err) {
      console.log(err);
      res.send('Something went wrong');
    }
  };

  return {
    getGoogleAuthUrl,
    getAccessToken,
    loginMobile,
    logout,
  };
}
