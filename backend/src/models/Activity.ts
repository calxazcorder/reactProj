import mongoose, { Schema, Document } from 'mongoose';

// Assuming you have the ICriteria interface and CriteriaSchema defined in another file
import { ICriteria, CriteriaSchema } from './Criteria'; // Adjust the path as necessary

// Define the interface for the activity
export interface IActivity extends Document {
  title: string;
  totalScore: number;
  criterias?: ICriteria[]; // Use an array of ICriteria
}

// Define the schema for the activity
const ActivitySchema: Schema = new Schema({ 
  title: {
    type: String,
    required: true
  },
  totalScore: {
    type: Number,
    required: false
  },
  criterias: {
    type: [CriteriaSchema], // ← Add this field!
    required: false,
    default: []
  }
});

// Create and export the model
export const Activity = mongoose.model<IActivity>('Activity', ActivitySchema);