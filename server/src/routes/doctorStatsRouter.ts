import express from 'express';
import { getDoctorStats } from '../controllers/doctorStatsController.js';

const DoctorStatsRouter = express.Router();

DoctorStatsRouter.get('/:doctorId', getDoctorStats);

export default DoctorStatsRouter;