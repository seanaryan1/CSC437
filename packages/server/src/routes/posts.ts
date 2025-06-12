import { Router, Request, Response } from 'express';
import postSvc from '../services/post-svc';

const router = Router();

// GET /api/comments
router.get('/', async (_req: Request, res: Response) => {
  try {
    const list = await postSvc.index();
    res.json(list);
  } catch (err) {
    res.status(500).send(err);
  }
});

// GET /api/comments/:id
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const c = await postSvc.getById(req.params.id);
    if (c) res.json(c);
    else res.status(404).end();
  } catch (err) {
    res.status(500).send(err);
  }
});

// GET /api/comments/user/:user
router.get('/user/:user', async (req: Request, res: Response) => {
  try {
    const cs = await postSvc.getById(req.params.user);
    res.json(cs);
  } catch (err) {
    res.status(500).send(err);
  }
});

// POST /api/comments
router.post('/', async (req: Request, res: Response) => {
  try {
    const newComment = await postSvc.create(req.body);
    res.status(201).json(newComment);
  } catch (err) {
    res.status(500).send(err);
  }
});

// PUT /api/comments/:id
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const updated = await postSvc.update(req.params.id, req.body);
    res.json(updated);
  } catch (err) {
    res.status(404).send(err);
  }
});

// DELETE /api/comments/:id
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    await postSvc.remove(req.params.id);
    res.status(204).end();
  } catch (err) {
    res.status(404).send(err);
  }
});

export default router;
