const { stderr } = require('process');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

/**
 * @function
 * @name asyncExec
 * @param {String} command - shell command
 * @returns {{stdout:string | null, stderr:string | null}}
 */
exports.asyncExec = async command => {
    try {
        const { stdout, stderr } = await exec(command);

        return {
            stdout: stdout || null,
            stderr: stderr || null,
        };
    } catch (e) {
        throw e;
    }
};
