import { Router } from 'express';
import { prisma } from '../db.js';

const router = Router();

router.get('/tags', async (req, res) => {
  try {
    const tags = await prisma.tag.findMany();
    res.json(tags);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching tags' });
  }
});

export default router;