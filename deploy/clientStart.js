const { installPackages } = require('./helpers/installPackages');
const { getCurrentConfig } = require('./helpers/getCurrentConfig');

const { generateEnviroment } = require('./helpers/generateEnviroment');
const { ssrModeStart } = require('./helpers/scripts/ssr/start');
const { ssrModeStop } = require('./helpers/scripts/ssr/stop');

const { removeLockFile, removeNodeModules } = require('./config');

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

    if (process.env.SSR_MODE === 'true') {
        await ssrModeStop();
        await ssrModeStart()};

    process.exit();
};

main();
