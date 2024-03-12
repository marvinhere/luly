/*
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');
function build(){
    console.log("Building...")
    try{
        var lulyFilePath = path.join(process.cwd(),'luly.config.json');
        if (!fs.existsSync(lulyFilePath)) {
        throw new Error("You can't compile your project from here");
        }
        const tscBuild = spawn('tsc', {
            cwd: process.cwd(),
            stdio: 'inherit',
        });
    
        tscBuild.on('close', (code) => {
            if (code === 0) {
            console.log('Project compilled successfully.');
            } else {
            console.error('tsc failed with exit code:', code);
            }
        });
    }catch(error){
        console.log(error.message)
    }
    
}

module.exports = {build}
*/
const { spawnSync } = require('child_process');
const path = require('path');
const fs = require('fs');

function build() {
    console.log("Building...")
    try {
        var lulyFilePath = path.join(process.cwd(), 'luly.config.json');
        if (!fs.existsSync(lulyFilePath)) {
            throw new Error("You can't compile your project from here");
        }

        const tscPath = path.join(process.cwd(), 'node_modules', '.bin', 'tsc');
        const tscBuild = spawnSync(tscPath, {
            stdio: 'inherit',
            shell: true
        });

        if (tscBuild.status === 0) {
            console.log('Project compiled successfully.');
        } else {
            console.error('tsc failed with exit code:', tscBuild.status);
        }
    } catch (error) {
        console.error('Error during build:', error.message);
    }
}

module.exports = { build };

