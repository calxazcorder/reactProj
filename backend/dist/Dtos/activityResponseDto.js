"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActivityResponseDto = void 0;
class ActivityResponseDto {
    constructor(title, totalScore, criterias) {
        this.title = title;
        this.totalScore = totalScore;
        this.criterias = criterias; // Yes, this passes the full criterias!
    }
}
exports.ActivityResponseDto = ActivityResponseDto;
