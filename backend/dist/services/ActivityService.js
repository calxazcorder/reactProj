"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activityService = void 0;
const activityResponseDto_1 = require("../Dtos/activityResponseDto");
const ActivityRepository_1 = require("../repos/ActivityRepository");
class ActivityService {
    constructor() {
    }
    async registerActivity({ title }) {
        return await ActivityRepository_1.activityRepository.save({ title });
    }
    async getAll() {
        const activities = await ActivityRepository_1.activityRepository.getAll();
        const dtosList = activities.map((activity) => {
            const newActivity = new activityResponseDto_1.ActivityResponseDto(activity.title, activity.totalScore, activity.criterias);
            return newActivity;
        });
        return dtosList; // ✅ Added return statement!
    }
}
exports.activityService = new ActivityService(); // export instance
