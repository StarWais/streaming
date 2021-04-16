import express from 'express';
import { getStreamsInfo } from '../controllers/streams.js';
const router = express.Router();

router.get('/info', getStreamsInfo);
export default router;
