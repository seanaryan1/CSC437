// packages/server/src/index.ts
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';

import { connect } from './services/mongo';
import commentsRouter from './routes/comments';
import postsRouter    from './routes/posts';
import authRouter     from './routes/auth';

const app = express();
const PORT = Number(process.env.PORT) || 3000;

// 1) Connect once to your "Comments" DB
connect("Comments");

// 2) JSON body parser
app.use(express.json());

// 3) Mount your API routes
app.use("/api/comments", commentsRouter);
app.use("/api/posts",    postsRouter);
app.use("/api/auth",     authRouter);

// 4) Start listening (no static, no fallback yet)
app.listen(PORT, () => {
  console.log(`🚀  API server up on http://localhost:${PORT}`);
});
