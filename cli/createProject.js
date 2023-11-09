const fs = require('fs-extra');
const path = require('path');
const { spawn } = require('child_process');


const currentDirectory = process.cwd();
const templateDirectory = path.join(__dirname, 'templates', 'create');

function createNewProject(projectName) {
 try{
  projectName = projectNameValidation(projectName);
  const newProjectDirectory = path.join(currentDirectory, projectName); // Directorio en la ruta actual

  fs.copy(templateDirectory, newProjectDirectory)
    .then(() => {
      console.log(`"${projectName}" created successfuly at: ${newProjectDirectory}`);
      
      const npmInstall = spawn('npm', ['install'], {
        cwd: newProjectDirectory,
        stdio: 'inherit',
      });
  
      npmInstall.on('close', (code) => {
        if (code === 0) {
          console.log('npm install completed successfully.');
        } else {
          console.error('npm install failed with exit code:', code);
        }
      });
      
    })
    .catch((error) => {
      console.error('Error creating the project:', error);
    });
 }catch(error){
  console.log(error.message)
 }
  
}

function projectNameValidation(name) {
  if (!name) {
    throw new Error('The project name must be a string.');
  }

  if (typeof name !== 'string') {
    throw new Error('The project name must be a string.');
  }

  
  const lowercaseName = name.toLowerCase();

  if (lowercaseName.length > 10) {
    throw new Error('The project name cannot exceed 10 characters.');
  }

  if (!/^[a-z0-9-]+$/.test(lowercaseName)) {
    throw new Error('The project name can only contain lowercase letters, numbers, and the "-" character as a special character.');
  }

  return lowercaseName;
}

module.exports = {createNewProject}
