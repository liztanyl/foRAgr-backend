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

  // console.log(process.env.OAUTH_CLIENT_ID, process.env.OAUTH_CLIENT_SECRET);

  return oauth2Client.generateAuthUrl({
    access_type: 'offline',
    prompt: 'consent',
    scope: scopes, // If you only need one scope you can pass it as string
  });
}

export default function initUserController(db) {
  const getGoogleAuthUrl = async (req, res) => {
    try {
      const url = getGoogleAuthURLHelper();
      console.log('sending client to google auth url');
      res.send(url);
    } catch (err) {
      console.log(err);
    }
  };

  const getAccessToken = async (req, res) => {
    try {
      const { authCode } = req.body;

      if (authCode) {
        const { tokens } = await oauth2Client.getToken(authCode);
        console.log(tokens);

        // Get google user data
        const googleUser = await axios
          .get(
            `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${tokens.access_token}`,
            {
              headers: {
                Authorization: `Bearer ${tokens.id_token}`,
              },
            }
          )
          .then((response) => {
            return response.data;
          })
          .catch((error) => {
            throw new Error(error.message);
          });

        console.log(googleUser);

        // Package google user data as a jwt, then send as a cookie
        const token = jwt.sign(googleUser, process.env.JWT_SECRET_KEY);
        console.log('login_token:', token);

        res.cookie('login_token', token, {
          maxAge: 900000,
          httpOnly: true,
          secure: false,
        });
        res.send({ token });
      } else {
        res.status(401).send('Invalid login');
      }
    } catch (err) {
      console.log(err);
      res.status(401).send('Invalid login');
    }
  };

  return {
    getGoogleAuthUrl,
    getAccessToken,
  };
}
