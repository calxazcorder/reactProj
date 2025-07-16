import mongoose, { Schema } from "mongoose"

export interface IAssesment extends Document { 
    score?: number,
    yesNo?: boolean,
    dateGiven: Date
}

export const AssesmentSchema: Schema = new Schema({ 
    score: { 
        type: Number,
        required: false
    },
    dateGiven: { 
        type: Date, 
        required: true
    }
})

export const Assesment = mongoose.model<IAssesment>('Assesment', AssesmentSchema)