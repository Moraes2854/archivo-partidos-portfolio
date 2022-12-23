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
exports.confirmar = exports.leerFecha = exports.leerCamara = exports.leerLink = exports.pause = exports.inquirerMenu = void 0;
const ansi_colors_1 = __importDefault(require("ansi-colors"));
const inquirer_1 = __importDefault(require("inquirer"));
const menuOpts = [
    {
        type: 'list',
        name: 'option',
        message: '¿Que desea hacer?',
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
        ]
    }
];
const inquirerMenu = () => __awaiter(void 0, void 0, void 0, function* () {
    console.clear();
    console.log(ansi_colors_1.default.green('=================================================='));
    console.log(ansi_colors_1.default.cyan('Selecciones una opción'));
    console.log(ansi_colors_1.default.green('==================================================\n'));
    const opt = yield inquirer_1.default.prompt(menuOpts);
    return opt;
});
exports.inquirerMenu = inquirerMenu;
const pause = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log('\n');
    const resp = yield inquirer_1.default.prompt({
        type: 'input',
        name: 'continuar',
        message: `Presione ${ansi_colors_1.default.green('ENTER')} para continuar`
    });
    return resp;
});
exports.pause = pause;
const leerLink = () => __awaiter(void 0, void 0, void 0, function* () {
    const question = [
        {
            type: 'input',
            name: `link`,
            message: 'Ingresar link del partido',
            validate(value) {
                if (value.length === 0)
                    return 'Por favor ingrese un valor';
                return true;
            },
        }
    ];
    const { link } = yield inquirer_1.default.prompt(question);
    return link;
});
exports.leerLink = leerLink;
const leerCamara = () => __awaiter(void 0, void 0, void 0, function* () {
    const question = [
        {
            type: 'list',
            name: 'camara',
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
    const { camara } = yield inquirer_1.default.prompt(question);
    return camara;
});
exports.leerCamara = leerCamara;
const leerFecha = () => __awaiter(void 0, void 0, void 0, function* () {
    const question = [
        {
            type: 'input',
            name: `fecha`,
            message: 'Ingresar fecha del partido',
            validate(value) {
                if (value.length === 0)
                    return 'Por favor ingrese un valor';
                return true;
            },
        }
    ];
    const { fecha } = yield inquirer_1.default.prompt(question);
    return fecha;
});
exports.leerFecha = leerFecha;
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
