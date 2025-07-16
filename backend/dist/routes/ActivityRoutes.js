"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.activityRoutes = void 0;
const express_1 = __importDefault(require("express"));
const ActivityController_1 = __importDefault(require("../controller/ActivityController"));
const router = express_1.default.Router();
exports.activityRoutes = router;
// POST /api/activities - calls your controller method
router.post('/activities', ActivityController_1.default.addNewActivity);
router.get('/activities', ActivityController_1.default.getAllActivities);
