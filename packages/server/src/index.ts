// packages/server/src/index.ts
import express, { Request, Response } from "express";
import { connect } from "./services/mongo";
import commentsRouter from "./routes/comments";
import postsRouter from "./routes/posts";
import authRoutes from "./routes/auth";
import fs from "node:fs/promises";
import path from "node:path";

const app = express();
connect("Post"); // your MongoDB database name

const port = process.env.PORT || 3000;
const staticDir = process.env.STATIC || "public";

// serve your proto static files
app.use(express.static(staticDir));

// parse JSON bodies
app.use(express.json());

// mount REST APIs
app.use("/api/comments", commentsRouter);
app.use("/api/posts", postsRouter);
app.use("/auth", authRoutes);

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
