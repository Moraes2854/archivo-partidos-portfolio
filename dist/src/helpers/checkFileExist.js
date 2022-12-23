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
exports.getExistingVideos = exports.checkFileExist = void 0;
const fs_1 = __importDefault(require("fs"));
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
exports.checkFileExist = checkFileExist;
const getExistingVideos = (fecha, camara) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve) => __awaiter(void 0, void 0, void 0, function* () {
        const videos = [];
        for (let i = 1; i <= 15; i++) {
            if (yield (0, exports.checkFileExist)(`${process.env.CLIPS_SUELTOS_PATH}/${fecha}/${(camara === 1) ? 'camara1' : 'camara2'}/${(i < 10) ? '0' : ''}${i}.mp4`)) {
                videos.push({
                    name: `${(i < 10) ? '0' : ''}${i}.mp4`,
                    path: `${process.env.CLIPS_SUELTOS_PATH}/${fecha}/${(camara === 1) ? 'camara1' : 'camara2'}/${(i < 10) ? '0' : ''}${i}.mp4`,
                    date: fecha,
                    downloaded: true,
                    numberVideo: `${i}`,
                    camara,
                });
            }
            else {
                videos.push({
                    name: `${(i < 10) ? '0' : ''}${i}.mp4`,
                    path: `${process.env.CLIPS_SUELTOS_PATH}/${fecha}/${(camara === 1) ? 'camara1' : 'camara2'}/${(i < 10) ? '0' : ''}${i}.mp4`,
                    date: fecha,
                    downloaded: false,
                    numberVideo: `${i}`,
                    camara,
                });
            }
        }
        resolve(videos);
    }));
});
exports.getExistingVideos = getExistingVideos;
