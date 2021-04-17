import express from 'express';
import { getStreamsInfo, getStreamViewers } from '../controllers/streams.js';
const router = express.Router();

router.get('/info', getStreamsInfo);
router.get('/getViewers', getStreamViewers);
export default router;
