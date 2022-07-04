const { unlink } = require('fs/promises');
const fs = require('fs');

/**
 * @function
 * @name generateEnviroment
 * @param { {APP_NAME: string, SSR_MODE: 'true' | 'false', PORT: number,  IS_CLIENT_SERVER: 'true' | 'false', DOMAIN: string, deploy: { exec_mode: string, instances: number,  }}} config
 * @return { Promise<void> }
 */
exports.generateEnviroment = async config => {
    // Переписываем конфиг /////////////////////////////////////////////////////////////////
    // .env
    try {
        await unlink('./.env');
        console.log('successfully deleted ./.env');
    } catch (error) {
        console.error(error.message);
    }

    try {
        fs.writeFileSync(
            './.env',
            Object.entries(config)
                .map(([key, value]) => {
                    if (typeof value === 'string' || typeof value === 'number') {
                        process.env[key] = value;
                        return `${key} = ${value}`;
                    }
                    return null;
                })
                .filter(value => value)
                .join(`\n`),
        );
        console.log('successfully created ./.env');
    } catch (err) {
        console.error(err);
    }
};
