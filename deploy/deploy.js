const { installPackages } = require('./helpers/installPackages');
const { getCurrentConfig } = require('./helpers/getCurrentConfig');

const { generateEnviroment } = require('./helpers/generateEnviroment');
const { spaModeDeploy } = require('./helpers/scripts/spa/index');
const { ssrModeStart } = require('./helpers/scripts/ssr/start');
const { ssrModeStop } = require('./helpers/scripts/ssr/stop');
const { ssrModeBuild } = require('./helpers/scripts/ssr/build');

const { script, mockServerscript, removeLockFile, removeNodeModules } = require('./config');

const { unlink } = require('fs/promises');
const fs = require('fs');

const main = async () => {
    try {
        await ssrModeStop();
    } catch (e) {
        console.error('Cant stop ssr mode instance: Not detected');
    }

    // Устанавливаем пакеты
    await installPackages({
        removeNodeModules: removeNodeModules,
        removeLockFile: removeLockFile,
    });
    // Получаем переменные для окружения
    const config = await getCurrentConfig();
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

    // Для мок сервера
    // mock.ecosystem.config.js
    try {
        await unlink('./mock.ecosystem.config.js');
        console.log('successfully deleted ./mock.ecosystem.config.js');
    } catch (error) {
        console.error(error.message);
    }

    try {
        fs.writeFileSync(
            './mock.ecosystem.config.js',
            `module.exports = {
        apps: [
            {
                name: "${config.MOCK_SERVER_NAME || ''}",
                exec_mode: "cluster",
                instances: 1,
                script: "${mockServerscript}",
                args: "mocks-server --port ${config.MOCK_SERVER_PORT}"
            }
        ]
    };`,
        );
        console.log('successfully created ./mock.ecosystem.config.js');
    } catch (err) {
        console.error(err);
    }

    if (process.env.SSR_MODE === 'true') {
        await ssrModeBuild();
        await ssrModeStart();
    } else await spaModeDeploy();

    process.exit();
};

main();
