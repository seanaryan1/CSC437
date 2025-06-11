// packages/server/src/routes/posts.ts
import { Router, Request, Response } from 'express';
import postSvc from '../services/post-svc';

const router = Router();

// GET /api/posts
router.get('/', async (_req: Request, res: Response) => {
  try {
    const list = await postSvc.index();
    res.json(list);
  } catch (err) {
    res.status(500).send(err);
  }
});

// GET /api/posts/:id
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const p = await postSvc.getById(req.params.id);
    if (p) res.json(p);
    else res.status(404).end();
  } catch (err) {
    res.status(500).send(err);
  }
});

// POST /api/posts
router.post('/', async (req: Request, res: Response) => {
  try {
    const newPost = await postSvc.create(req.body);
    res.status(201).json(newPost);
  } catch (err) {
    res.status(500).send(err);
  }
});

// PUT /api/posts/:id
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const updated = await postSvc.update(req.params.id, req.body);
    res.json(updated);
  } catch (err) {
    res.status(404).send(err);
  }
});

// DELETE /api/posts/:id
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    await postSvc.remove(req.params.id);
    res.status(204).end();
  } catch (err) {
    res.status(404).send(err);
  }
});

export default router;
