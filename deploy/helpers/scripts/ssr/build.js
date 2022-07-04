const { asyncExec } = require('../../asyncExec');
const { script } = require('../../../config');

exports.ssrModeBuild = async () => {
    require('dotenv').config();
    // Устанавливаем пакеты
    try {
        const result = await asyncExec(`npx nuxt build`);
        console.log(result.stdout || result.stderr);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
};
