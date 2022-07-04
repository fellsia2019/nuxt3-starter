exports.ssrModeStart = async () => {
    require('dotenv').config();

    const pm2 = require('pm2-promise');

    await pm2.connect();
    // Стартуем PM2
    try {
        await pm2.start('./ecosystem.config.js');
        console.log(`Process started at http://localhost:${process.env.PORT}`);
    } catch (e) {
        console.error(e);
    }
    // Стартуем мок сервер
    if (process.env.MOCK_SERVER_NAME)
        try {
            await pm2.start('./mock.ecosystem.config.js');
            console.log(
                `Mock server process started at http://localhost:${process.env.MOCK_SERVER_PORT}`,
            );
        } catch (e) {
            console.error(e);
        }

    await pm2.disconnect();
};
