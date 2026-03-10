import express from 'express';
import { getAdminStats } from '../controllers/adminStatsController.js';

const AdminStatsRouter = express.Router();

AdminStatsRouter.get('/:hospitalId/stats', getAdminStats);

export default AdminStatsRouter;