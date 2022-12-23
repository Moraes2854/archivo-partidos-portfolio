import colors from 'ansi-colors';
import inquirer, { Answers, QuestionCollection } from 'inquirer';


const mainMenuOpts:QuestionCollection<Answers> = [
    {
        type: 'list',
        name: 'option',
        message:'¿Que hacer?',
        choices: [
            {
                value:'1',
                name: `${colors.green('1.')} Descargar videos`
            },
            {
                value:'2',
                name:`${colors.green('2.')} Generar video completo`
            },
            {
                value:'3',
                name:`${colors.green('3.')} Generar videos con zoom`
            },
            {
                value:'0',
                name:`${colors.green('0.')} Salir`
            }     
        ],   
    }
];




export const inquirerMainMenu = async():Promise<Answers> =>{
    // console.clear();
    console.log(colors.green('=================================================='));
    console.log(colors.cyan('Seleccionar una opción'));
    console.log(colors.green('==================================================\n'));
    const opt = await inquirer.prompt(mainMenuOpts);
    return opt;
}

export const pause = async():Promise<Boolean> =>{
    console.log('\n');

    const resp = await inquirer.prompt({
        type: 'input',
        name: 'continue',
        message:`Presione ${colors.green('ENTER')} para continuar`
    });

    return resp.continue;
}

export const askCamera = async():Promise<1|2> =>{
    const question = [
        {
            type: 'list',
            name: 'camera',
            message:'¿Que cámara desea descargar?',
            choices: [
                {
                    value:1,
                    name: `${colors.green('1.')} Cámara 1`
                },
                {
                    value:2,
                    name:`${colors.green('2.')} Cámara 2`
                },    
            ]
        }
    ];
    const { camera } = await inquirer.prompt(question);
    return (camera as 1|2);
}

export const askAboutCookies = async():Promise<boolean> =>{
    const question = [
        {
            type: 'list',
            name: 'acceptCookies',
            message:'¿Aceptar cookies?',
            choices: [
                {
                    value:true,
                    name: `${colors.green('1.')} Aceptar`
                },
                {
                    value:false,
                    name:`${colors.green('2.')} Ignorar`
                },    
            ]
        }
    ];
    const { acceptCookies } = await inquirer.prompt(question);
    return acceptCookies;
}




export const confirmar = async (pregunta:string) =>{
    let preguntas = [
        {
            type: 'confirm',
            name: 'respuesta',
            message:pregunta
        }
    ];

    return await inquirer.prompt(preguntas);
}



