"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getExistingVideos = void 0;
const fs_1 = __importDefault(require("fs"));
const getExistingVideos = (date, camera) => __awaiter(void 0, void 0, void 0, function* () {
    const videosPath = `${process.env.CLIPS_SUELTOS_PATH}/${date}/${(camera === 1) ? 'camara1' : 'camara2'}`;
    return new Promise((resolve) => __awaiter(void 0, void 0, void 0, function* () {
        const videos = [];
        for (let i = 1; i <= 15; i++) {
            let downloaded = false;
            if (yield checkFileExist(`${videosPath}/${(i < 10) ? '0' : ''}${i}.mp4`))
                downloaded = true;
            videos.push({
                name: `${(i < 10) ? '0' : ''}${i}.mp4`,
                path: `${videosPath}/${(i < 10) ? '0' : ''}${i}.mp4`,
                date,
                downloaded,
                numberVideo: `${i}`,
                camera,
            });
        }
        resolve(videos);
    }));
});
exports.getExistingVideos = getExistingVideos;
const checkFileExist = (path, timeout = 2000) => __awaiter(void 0, void 0, void 0, function* () {
    let totalTime = 0;
    let checkTime = timeout / 10;
    return yield new Promise((resolve, reject) => {
        const timer = setInterval(function () {
            totalTime += checkTime;
            const fileExists = fs_1.default.existsSync(path);
            if (fileExists || totalTime >= timeout) {
                clearInterval(timer);
                resolve(fileExists);
            }
        }, checkTime);
    });
});
