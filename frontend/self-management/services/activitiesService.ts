import { CriteriaResponse, activitySave } from "../types";

// Define the shape of what you expect from the API
interface ActivityResponse {
  id: string; // Add ID field for deletions
  title: string;
  totalScore?: number;
  criterias?: CriteriaResponse[];
}

const getAll = async (): Promise<ActivityResponse[]> => {
  try {
      const response = await fetch('http://192.168.100.5:3000/api/activities', {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json'
          }
      });
      
      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data: ActivityResponse[] = await response.json(); 
      return data;
  } catch (error) {
      console.error('Error fetching activities:', error);
      throw error;
  }
};    

const addNew = async (newActivity: activitySave): Promise<ActivityResponse> => { 
  try {
    const response = await fetch('http://192.168.100.5:3000/api/activities', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newActivity)
    });

    // MISSING: Check if response is ok
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    console.log("submitted thingy", newActivity);
    
    // MISSING: Return the created activity
    const createdActivity: ActivityResponse = await response.json();
    return createdActivity;

  } catch (error) { 
    console.error('Error saving activities:', error);
    throw error;
  }
}

// FIXED: Correct URL and proper error handling
const deleteActivity = async (activityName: string): Promise<boolean> => {
  try { 
    // FIXED: Missing 'api/activities' in URL
    const response = await fetch(`http://192.168.100.5:3000/api/activities/${activityName}`, { 
      method: 'DELETE',
      headers: { 
        'Content-Type': 'application/json'
      }
    });

    // MISSING: Check if response is ok
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // FIXED: Actually use the response and return something meaningful
    const result = await response.json();
    console.log('Delete result:', result);
    return true; // or return result if you need the response data

  } catch (error) { 
    console.error('Error deleting activity:', error);
    throw error;
  }
}

// ALTERNATIVE: Delete by ID (recommended)
const deleteActivityById = async (activityId: string): Promise<boolean> => {
  try { 
    const response = await fetch(`http://192.168.100.5:3000/api/activities/${activityId}`, { 
      method: 'DELETE',
      headers: { 
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log('Delete result:', result);
    return true;

  } catch (error) { 
    console.error('Error deleting activity:', error);
    throw error;
  }
}

const ActivitiesService = { 
  getAll,
  addNew,
  deleteActivity,
  deleteActivityById // Add the ID version
};

export default ActivitiesService;