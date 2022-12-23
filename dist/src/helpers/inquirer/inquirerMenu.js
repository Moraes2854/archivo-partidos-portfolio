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
exports.confirmar = exports.askAboutCookies = exports.askCamera = exports.pause = exports.inquirerMainMenu = void 0;
const ansi_colors_1 = __importDefault(require("ansi-colors"));
const inquirer_1 = __importDefault(require("inquirer"));
const mainMenuOpts = [
    {
        type: 'list',
        name: 'option',
        message: '¿Que hacer?',
        choices: [
            {
                value: '1',
                name: `${ansi_colors_1.default.green('1.')} Descargar videos`
            },
            {
                value: '2',
                name: `${ansi_colors_1.default.green('2.')} Generar video completo`
            },
            {
                value: '3',
                name: `${ansi_colors_1.default.green('3.')} Generar videos con zoom`
            },
            {
                value: '0',
                name: `${ansi_colors_1.default.green('0.')} Salir`
            }
        ],
    }
];
const inquirerMainMenu = () => __awaiter(void 0, void 0, void 0, function* () {
    // console.clear();
    console.log(ansi_colors_1.default.green('=================================================='));
    console.log(ansi_colors_1.default.cyan('Seleccionar una opción'));
    console.log(ansi_colors_1.default.green('==================================================\n'));
    const opt = yield inquirer_1.default.prompt(mainMenuOpts);
    return opt;
});
exports.inquirerMainMenu = inquirerMainMenu;
const pause = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log('\n');
    const resp = yield inquirer_1.default.prompt({
        type: 'input',
        name: 'continue',
        message: `Presione ${ansi_colors_1.default.green('ENTER')} para continuar`
    });
    return resp.continue;
});
exports.pause = pause;
const askCamera = () => __awaiter(void 0, void 0, void 0, function* () {
    const question = [
        {
            type: 'list',
            name: 'camera',
            message: '¿Que cámara desea descargar?',
            choices: [
                {
                    value: 1,
                    name: `${ansi_colors_1.default.green('1.')} Cámara 1`
                },
                {
                    value: 2,
                    name: `${ansi_colors_1.default.green('2.')} Cámara 2`
                },
            ]
        }
    ];
    const { camera } = yield inquirer_1.default.prompt(question);
    return camera;
});
exports.askCamera = askCamera;
const askAboutCookies = () => __awaiter(void 0, void 0, void 0, function* () {
    const question = [
        {
            type: 'list',
            name: 'acceptCookies',
            message: '¿Aceptar cookies?',
            choices: [
                {
                    value: true,
                    name: `${ansi_colors_1.default.green('1.')} Aceptar`
                },
                {
                    value: false,
                    name: `${ansi_colors_1.default.green('2.')} Ignorar`
                },
            ]
        }
    ];
    const { acceptCookies } = yield inquirer_1.default.prompt(question);
    return acceptCookies;
});
exports.askAboutCookies = askAboutCookies;
const confirmar = (pregunta) => __awaiter(void 0, void 0, void 0, function* () {
    let preguntas = [
        {
            type: 'confirm',
            name: 'respuesta',
            message: pregunta
        }
    ];
    return yield inquirer_1.default.prompt(preguntas);
});
exports.confirmar = confirmar;
