const { asyncExec } = require('./asyncExec');
const { branchConfig } = require('../config');

/**
 * @function
 * @name getCurrentConfig
 * @param { boolean } local - if true returns config for local usage
 * @returns { {APP_NAME: string, SSR_MODE: 'true' | 'false', PORT: number,  IS_CLIENT_SERVER: 'true' | 'false', DOMAIN: string, deploy: { exec_mode: string, instances: number,  }}}
 */

const branchAndPlatformEnum = {
    local: 'dev', // Для локальной разработки
    dev: 'test',
    master: 'preprod',
    prod: 'prod', // Для билда на стороне клиента
};

exports.getCurrentConfig = async (local = false, forClient = false) => {
    // Если запустили локально
    if (local) return branchConfig()[branchAndPlatformEnum.local];
    // Если билдим для клиента
    if (forClient) return branchConfig()[branchAndPlatformEnum.prod];

    // Иначе выбираем конфиг по ветке
    // Получаем ветку
    let branch = null;
    try {
        const result = await asyncExec('git branch --show-current');
        branch = result.stdout ? result.stdout : 'prod';
    } catch (e) {
        console.log(e);
        exit(1);
    }
    branch = branch.trim();
    const currentConfig = branchConfig()[branchAndPlatformEnum[branch]];
    if (!currentConfig) {
        console.error('Config is broken');
        process.exit(1);
    }
    console.log(`Current enviroment: ${branchAndPlatformEnum[branch]}`);
    return currentConfig;
};
