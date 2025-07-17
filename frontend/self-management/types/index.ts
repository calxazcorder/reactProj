// Match your backend exactly
export interface ActivityResponse { 
    title: string;
    totalScore?: number; // Add this property from your backend
    criterias: CriteriaResponse[]; // Use plural, optional, and array type
}

// Define the criteria structure
export interface CriteriaResponse {
    name: string;
    assesment: assesmentResponse;
    yesNo: boolean
    // Add any other properties your criteria might have
}

export interface assesmentResponse { 
    yesNo: boolean;
}

export interface activitySave { 
    title: string;
    criterias: Record<string, boolean>;

}

export interface criteriaSave { 
    name: string; 
    assesment: assesmentinitSave[];
}

export interface assesmentinitSave { 
    yesNo: boolean;
}

export type activityResponse = ActivityResponse;