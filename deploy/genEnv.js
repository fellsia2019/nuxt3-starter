const { getCurrentConfig } = require('./helpers/getCurrentConfig');

const { generateEnviroment } = require('./helpers/generateEnviroment');

const main = async () => {
    const config = await getCurrentConfig(true);

    await generateEnviroment(config);

    process.exit();
};

main();
