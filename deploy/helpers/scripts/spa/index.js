const { asyncExec } = require('../../asyncExec');

exports.spaModeDeploy = async () => {
    try {
        const result = await asyncExec(`npx nuxt build`);
        console.log(result.stdout || result.stderr);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }

    console.log('Redirect requests to ./dist directory');
    process.exit();
};
