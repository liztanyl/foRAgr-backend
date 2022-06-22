import express from 'express';
import cors from 'cors';
import methodOverride from 'method-override';
import cookieParser from 'cookie-parser';
import bindRoutes from './routes.mjs';
import { verifyLoggedInUser } from './controllers/users.mjs';

const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:19006';

const app = express();
app.use(
  cors({
    credentials: true,
    origin: [FRONTEND_URL, '127.0.0.1:19006'],
  })
);
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(express.static('public'));
app.use(express.json());

// CUSTOM MIDDLEWARE
app.use(verifyLoggedInUser);

bindRoutes(app);

const PORT = process.env.PORT || 3004;
app.listen(PORT);
