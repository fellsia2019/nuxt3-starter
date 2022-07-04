const { installPackages } = require('./helpers/installPackages');
const { getCurrentConfig } = require('./helpers/getCurrentConfig');

const { generateEnviroment } = require('./helpers/generateEnviroment');
const { spaModeDeploy } = require('./helpers/scripts/spa/index');
const { ssrModeBuild } = require('./helpers/scripts/ssr/build');

const { script, removeLockFile, removeNodeModules } = require('./config');

const { unlink } = require('fs/promises');
const fs = require('fs');

const main = async () => {
    // Устанавливаем пакеты
    await installPackages({
        removeNodeModules: removeNodeModules,
        removeLockFile: removeLockFile,
    });
    // Получаем переменные для окружения
    const config = await getCurrentConfig(false, true);
    // Устанавливаем переменные для окружения
    await generateEnviroment(config);

    // ecosystem.config.js
    try {
        await unlink('./ecosystem.config.js');
        console.log('successfully deleted ./ecosystem.config.js');
    } catch (error) {
        console.error(error.message);
    }

    try {
        fs.writeFileSync(
            './ecosystem.config.js',
            `module.exports = {
    apps: [
        {
            name: "${config.APP_NAME}",
            exec_mode: "${config.deploy.exec_mode}",
            instances: ${config.deploy.instances},
            script: "${script}",
            args: "start"
        }
    ]
};`,
        );
        console.log('successfully created ./ecosystem.config.js');
    } catch (err) {
        console.error(err);
    }

    if (process.env.SSR_MODE === 'true') await ssrModeBuild();
    else await spaModeDeploy();

    process.exit();
};

main();
