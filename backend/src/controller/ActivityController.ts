import { Request, Response } from 'express';
import { activityService } from '../services/ActivityService';
import { ActivityResponseDto } from '../Dtos/activityResponseDto';

interface ActivityRequest {
  title: string;
  criterias: Record<string, boolean>;
}

class ActivityController {
  async addNewActivity(req: Request, res: Response): Promise<void> {
    try {
      const { title, criterias } = req.body as ActivityRequest;
      // Call service with properly typed parameters
      console.log('uuaa', title, criterias)
      const savedActivity = await activityService.registerActivity({ 
        title, 
        criterias
      });
      res.status(201).json({
        message: 'Activity added successfully',
        data: savedActivity // Return the full saved activity
      });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({
          message: error.message
        });
      } else {
        res.status(500).json({
          message: 'An unknown error occurred'
        });
      }
    }
  }

  async getAllActivities(req: Request, res: Response): Promise<void> { 
    try { 
        const serviceResponse: ActivityResponseDto[] = await activityService.getAll();
        res.status(200).json(serviceResponse); // Send DTOs as JSON
    } catch(error) { 
        if (error instanceof Error) { 
            res.status(400).json({
                message: error.message
            });
        } else {
            res.status(500).json({
                message: 'unknown error'
            });
        }
    }
}

  async deleteActivity(req: Request, res: Response): Promise<void> { 
    try { 
      // activityName activity name comes as a request
      const activityName = req.params.activityName
      const serviceResponse: boolean = await activityService.deleteRaToo(activityName)
      res.status(200).json(serviceResponse);
    } catch(error) { 
      if (error instanceof Error) { 
        res.status(400).json({
            message: error.message
        });
    } else {
        res.status(500).json({
            message: 'unknown error'
        });
    }
    }
  }
}

export default new ActivityController();