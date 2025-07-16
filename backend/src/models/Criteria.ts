    import mongoose, { Schema, Document } from "mongoose";
    import { IAssesment, AssesmentSchema } from "../models/Assesment"; // Adjust the path


    export interface ICriteria extends Document {
        name: string;
        assessments: IAssesment[]; 
        yesNo?: Boolean;// Use the correct type for the array
    }

    export const CriteriaSchema: Schema = new Schema({
        name: { 
            type: String, 
            required: true 
        },
        assessments: { // Corrected the spelling and added a comma
            type: [AssesmentSchema], // Use the appropriate type for the assessments
            required: false,
            default: []
        },
        yesNo: { 
            type: Boolean,
            required: false
        }
    });

    export const Criteria = mongoose.model<ICriteria>('Criteria', CriteriaSchema);
