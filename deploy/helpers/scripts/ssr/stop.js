exports.ssrModeStop = async () => {
    require('dotenv').config();

    const pm2 = require('pm2-promise');

    await pm2.connect();
    // Останавливаем PM2
    try {
        for (let p of await pm2.list()) {
            if (p.name === process.env.MOCK_SERVER_NAME) {
                await pm2.stop(process.env.MOCK_SERVER_NAME);
                await pm2.delete(process.env.MOCK_SERVER_NAME);
                console.log('stopping');
            }
        }
    } catch (e) {
        console.error(e);
    }
    // Останавливаем PM2 мок сервер
    if (process.env.MOCK_SERVER_NAME)
        try {
            for (let p of await pm2.list()) {
                if (p.name === process.env.APP_NAME) {
                    await pm2.stop(process.env.APP_NAME);
                    await pm2.delete(process.env.APP_NAME);
                    console.log('stopping');
                }
            }
        } catch (e) {
            console.error(e);
        }
    await pm2.disconnect();
};
