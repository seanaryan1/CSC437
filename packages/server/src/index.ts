// src/index.ts
import express, { Request, Response } from "express";
import { connect } from "./services/mongo";
import commentSvc from "./services/comment-svc";
connect("Comments");
const app = express();
const port = process.env.PORT || 3000;
const staticDir = process.env.STATIC || "public";

app.use(express.static(staticDir));



app.get("/comment/:user", (req: Request, res: Response) => {
    commentSvc
        .getByUser(req.params.user)          
        .then((c) => c
            ? res.json(c)
            : res.status(404).end()
        )
        .catch((err: any) => res.status(500).send(err));
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});