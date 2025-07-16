"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ActivityService_1 = require("../services/ActivityService");
class ActivityController {
    async addNewActivity(req, res) {
        try {
            const { title, score, createdAt } = req.body;
            // Call service with properly typed parameters
            await ActivityService_1.activityService.registerActivity({
                title,
                score,
                createdAt
            });
            res.status(201).json({
                message: 'Activity added successfully',
                data: { title, score, createdAt }
            });
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(400).json({
                    message: error.message
                });
            }
            else {
                res.status(500).json({
                    message: 'An unknown error occurred'
                });
            }
        }
    }
    async getAllActivities(req, res) {
        try {
            const serviceResponse = await ActivityService_1.activityService.getAll();
            res.status(200).json(serviceResponse); // Send DTOs as JSON
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(400).json({
                    message: error.message
                });
            }
            else {
                res.status(500).json({
                    message: 'unknown error'
                });
            }
        }
    }
}
exports.default = new ActivityController();
