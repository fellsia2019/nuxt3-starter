const { asyncExec } = require('./asyncExec');

/**
 * @function async function for npm install
 * @name installPackages
 * @param { { removeLockFile: boolean, removeNodeModules: boolean} }
 * @returns { Promise<void> }
 */
exports.installPackages = async (
    config = {
        removeLockFile: false,
        removeNodeModules: false,
    },
) => {
    try {
        if (config.removeNodeModules) await asyncExec(`rm -r node_modules`);
        if (config.removeLockFile) await asyncExec(`rm -r package-lock.json`);

        const result = await asyncExec(`npm install`);
        console.log(result.stdout || result.stderr);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
};
