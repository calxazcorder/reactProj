import mongoose from 'mongoose';


export const connectDB = async () => {
    try { 
        await mongoose.connect('mongodb+srv://calxazichi123:database@cluster0.njru9f0.mongodb.net/selfmanagement?retryWrites=true&w=majority&appName=Cluster0');
        console.log('MongoDB connected');
    } catch (error) {
        console.error('Database connection failed:', error);
        process.exit(1);
      }
    
    }
