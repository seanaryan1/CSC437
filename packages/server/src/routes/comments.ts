import { Router, Request, Response } from 'express';
import commentSvc from '../services/comment-svc';

const router = Router();

// GET /api/comments
router.get('/', async (_req: Request, res: Response) => {
  try {
    const list = await commentSvc.index();
    res.json(list);
  } catch (err) {
    res.status(500).send(err);
  }
});

// GET /api/comments/:id
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const c = await commentSvc.getById(req.params.id);
    if (c) res.json(c);
    else res.status(404).end();
  } catch (err) {
    res.status(500).send(err);
  }
});

// GET /api/comments/user/:user
router.get('/user/:user', async (req: Request, res: Response) => {
  try {
    const cs = await commentSvc.getByUser(req.params.user);
    res.json(cs);
  } catch (err) {
    res.status(500).send(err);
  }
});

// POST /api/comments
router.post('/', async (req: Request, res: Response) => {
  try {
    const newComment = await commentSvc.create(req.body);
    res.status(201).json(newComment);
  } catch (err) {
    res.status(500).send(err);
  }
});

// PUT /api/comments/:id
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const updated = await commentSvc.update(req.params.id, req.body);
    res.json(updated);
  } catch (err) {
    res.status(404).send(err);
  }
});

// DELETE /api/comments/:id
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    await commentSvc.remove(req.params.id);
    res.status(204).end();
  } catch (err) {
    res.status(404).send(err);
  }
});

export default router;
