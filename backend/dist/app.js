"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = require("./config/database");
const ActivityRoutes_1 = require("./routes/ActivityRoutes");
const cors_1 = __importDefault(require("cors")); // ✅ ADD THIS LINE
const app = (0, express_1.default)();
const PORT = 3000;
app.use(express_1.default.json()); // ADD THIS - needed to parse JSON request bodies
app.use((0, cors_1.default)({
    origin: ['http://localhost:8081', 'exp://192.168.100.5:8081'], // Only these can call your API
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: false // If you need cookies/auth
}));
app.get('/', (req, res) => {
    res.send('active!');
});
app.use('/api', ActivityRoutes_1.activityRoutes);
(0, database_1.connectDB)().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
});
