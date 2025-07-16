import express from 'express';
import { connectDB } from './config/database';
import { activityRoutes } from './routes/ActivityRoutes';
import cors from 'cors'; // ✅ ADD THIS LINE

const app = express();
const PORT = 3000;

app.use(express.json()); // ADD THIS - needed to parse JSON request bodies
app.use(cors({
  origin: ['http://localhost:8081', 'exp://192.168.100.6:8081'], // Only these can call your API
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: false // If you need cookies/auth
}));

app.get('/', (req, res) => {
  res.send('active!');
});

app.use('/api', activityRoutes);

connectDB().then(() => { 
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
})