// packages/server/src/index.ts

import express, { Request, Response } from "express";
import { connect } from "./services/mongo";
import commentsRouter from "./routes/comments";
import authRoutes from "./routes/auth";
import path from "node:path";
import fs from "node:fs/promises";

const app = express();
const PORT = process.env.PORT || 3000;

// 1) Connect to your MongoDB database (replace "Comments" with your actual DB name)
connect("Comments");

// 2) Parse JSON bodies for incoming API requests
app.use(express.json());

// 3) Mount your REST API routes under /api
//    - /api/comments → commentsRouter
//    - /api/...        → authRoutes (e.g. login, signup, etc.)
app.use("/api/comments", commentsRouter);
app.use("/api", authRoutes);

// 4) Serve the built front-end from packages/app/dist
//    (After running `npm run build` in packages/app, Vite outputs into /app/dist)
const clientDist = path.join(__dirname, "../app/dist");
app.use(express.static(clientDist));

// 5) Catch-all handler: for any GET request that isn’t an API or a static file,
//    return index.html so the client-side router can take over.
app.get("*", async (_req: Request, res: Response) => {
  try {
    const indexHtml = await fs.readFile(
      path.join(clientDist, "index.html"),
      "utf8"
    );
    res.send(indexHtml);
  } catch (err) {
    console.error("Error reading index.html from clientDist:", err);
    res.status(500).send("Server error");
  }
});

// 6) Start the server exactly once, listening on port 3000 (or the PORT env var)
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
