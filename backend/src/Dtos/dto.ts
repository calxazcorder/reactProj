// activity.dto.ts

// For creating/updating an Activity (Input DTO: What the API expects)
export interface CreateActivityDto {
    title: string;
    totalScore?: number; // Optional since `required: false` in schema
    criterias?: string[]; // Array of Criteria IDs (or full objects if needed)
  }
  
  // For returning an Activity (Output DTO: What the API sends back)
  export interface ActivityResponseDto {
    id: string;
    title: string;
    totalScore?: number;
    criterias?: CriteriaResponseDto[]; // Nested DTOs for populated data
  }

  // assessment.dto.ts

export interface AssessmentDto {
    score: number;
    dateGiven: Date;
  }
  
  export interface AssessmentResponseDto {
    id: string;
    score: number;
    dateGiven: string; // ISO date string (better for HTTP responses)
  }
  
  

  // criteria.dto.ts

// For creating/updating Criteria (Input)
export interface CreateCriteriaDto {
    name: string;
    assessments?: AssessmentDto[]; // Optional, if nested
  }
  
  // For returning Criteria (Output)
  export interface CriteriaResponseDto {
    id: string;
    name: string;
    assessments?: AssessmentResponseDto[];
  }
  