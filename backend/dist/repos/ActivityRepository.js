"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activityRepository = void 0;
const Activity_1 = require("../models/Activity"); // Ensure this path is correct
class ActivityRepository {
    async getAll() {
        try {
            const activities = await Activity_1.Activity.find();
            return activities;
        }
        catch (error) {
            console.error('Error fetching activities:', error);
            throw error;
        }
    }
    async save(activityData) {
        const activity = new Activity_1.Activity(activityData);
        return await activity.save();
    }
}
exports.activityRepository = new ActivityRepository();
