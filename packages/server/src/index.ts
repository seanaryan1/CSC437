// packages/server/src/index.ts
import express, { Request, Response } from "express";
import { connect } from "./services/mongo";
import comments from './routes/comments';
import commentsRouter from "./routes/comments";
import auth from "./routes/auth";
import fs from "node:fs/promises";
import path from "node:path";
import authRoutes from './routes/auth';
const app = express();
app.use("/auth", auth);
connect("Comments");   // ← your Atlas DB name
export * from "./models/comment";
export * from "./models/credential";
export * from "./models/project";
export * from "./models/userProfile";



const port = process.env.PORT || 3000;
const staticDir = process.env.STATIC || "public";

// serve your proto static files
app.use(express.static(staticDir));

// parse JSON bodies
app.use(express.json());

// mount the comments REST API
app.use("/api/comments", commentsRouter);

app.use('/api', authRoutes); 

app.listen(3000, () => console.log('Server running on port 3000'));

// you can still have other routes
app.get("/hello", (_req: Request, res: Response) => {
  res.send("Hello, World");
});

app.use("/app", async (_req, res) => {
  const htmlPath = path.resolve(staticDir, "index.html");
  const html = await fs.readFile(htmlPath, "utf8");
  res.send(html);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});