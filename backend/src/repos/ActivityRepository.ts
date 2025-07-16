import { Activity, IActivity } from "../models/Activity"; // Ensure this path is correct

class ActivityRepository {

    async deleteByName(activityName: string): Promise<boolean> {
        try {
            const result = await Activity.deleteOne({ title: activityName });
            
            if (result.deletedCount === 0) {
                throw new Error(`Activity with name "${activityName}" not found`);
            }
            
            console.log(`Successfully deleted activity: ${activityName}`);
            return true;
        } catch (error) {
            console.error('Error deleting activity by name:', error);
            throw error;
        }
    }

    async getAll(): Promise<IActivity[]> {
        try {
            const activities: IActivity[] = await Activity.find();
            return activities;
        } catch (error) {
            console.error('Error fetching activities:', error);
            throw error;
        }
    }
    
    async save(activityData: Partial<IActivity>): Promise<IActivity> { 
        const activity = new Activity(activityData);
        return await activity.save();
    }
}

export const activityRepository = new ActivityRepository();
