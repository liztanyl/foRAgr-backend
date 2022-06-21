import dotenv from 'dotenv';
import { google } from 'googleapis';

const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:19006';

dotenv.config();

const oauth2Client = new google.auth.OAuth2(
  process.env.OAUTH_CLIENT_ID,
  process.env.OAUTH_CLIENT_SECRET,
  `${FRONTEND_URL}`
);

function getGoogleAuthURLHelper() {
  const scopes = [
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/userinfo.email',
  ];

  console.log(process.env.OAUTH_CLIENT_ID, process.env.OAUTH_CLIENT_SECRET);

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
      console.log(url);
      res.send(url);
    } catch (err) {
      console.log(err);
    }
  };

  return {
    getGoogleAuthUrl,
  };
}
