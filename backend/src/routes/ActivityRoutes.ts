import express from 'express';
import activityController from '../controller/ActivityController';

const router = express.Router();

// POST /api/activities - calls your controller method
router.post('/activities', activityController.addNewActivity);

router.get('/activities', activityController.getAllActivities);

router.delete('/activities/:activityName', activityController.deleteActivity)
// GET /api/activities - if you want to add this later
// router.get('/activities', activityController.getAllActivities);

export { router as activityRoutes };