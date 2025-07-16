import { ICriteria } from "../models/Criteria";

export class ActivityResponseDto {
    title: string;
    totalScore?: number;
    criterias?: ICriteria[];
    
    constructor(title: string, totalScore?: number, criterias?: ICriteria[]) {
        this.title = title;
        this.totalScore = totalScore;
        this.criterias = criterias; // Yes, this passes the full criterias!
    }
}