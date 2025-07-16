    import { toNamespacedPath } from "path";
import { ActivityResponseDto } from "../Dtos/activityResponseDto";
import { Activity, IActivity } from "../models/Activity";
import { activityRepository } from "../repos/ActivityRepository";

    class ActivityService {
        constructor() { 
        }

        async registerActivity({ title, criterias }: any) {
            // Extract keys and values from the hashmap
            console.log('received', title, criterias)
            const criteriaEntries = Object.entries(criterias);
            // Create criteria structure
            const demappedCriterias = criteriaEntries.map(([name, type]) => ({
                name: name,              // criteria name (key)
                yesNo: type,              // criteria type (value - boolean in your case)
                assessments: []          // empty assessments for now
            }));

            const activity = new Activity({
                title: title,
                criterias: demappedCriterias
            });
            
        
            return await activityRepository.save(activity);
        }

        async getAll(): Promise<ActivityResponseDto[]> { // ✅ Added return type
            const activities: IActivity[] = await activityRepository.getAll();
            const dtosList = activities.map((activity: IActivity) => {
                const newActivity = new ActivityResponseDto(activity.title, activity.totalScore, activity.criterias);
                return newActivity;
            });
            return dtosList; // ✅ Added return statement!
        }
        

        async deleteRaToo(activityName: string): Promise<boolean> { 
            try { 
               return await activityRepository.deleteByName(activityName);
               
            } catch (error) { 
                throw error 
            }

        }
    }

    export const activityService = new ActivityService(); // export instance
