"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideoCollection = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class VideoCollection {
    constructor(date, camera, videos) {
        this.date = date;
        this.camera = camera;
        this.videos = videos;
    }
}
exports.VideoCollection = VideoCollection;
//`${process.env.CLIPS_SUELTOS_PATH}/${fechaFinal}/${(camara === 1) ? 'camara1' : 'camara2'}/${(contador+1<10)?'0':''}${contador+1}.mp4`;
