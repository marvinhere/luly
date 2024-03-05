const fs = require('fs');
const path = require('path');


function createNewModule(newName){
  try{
    newName = moduleNameValidation(newName);
    console.log("Creating module",newName)
    //Validar si existe luly.config.json
    var lulyFilePath = path.join(process.cwd(),'luly.config.json');
    if (!fs.existsSync(lulyFilePath)) {
      throw new Error("You can't create a module here");
    }

    let destinationFolderPath = path.join(process.cwd(),'src','App');
    if (!fs.existsSync(destinationFolderPath)) {
      fs.mkdirSync(destinationFolderPath);
    }

    destinationFolderPath = path.join(destinationFolderPath, `${newName}`);

    // Comprueba si la carpeta de destino existe, si no, créala
    if (fs.existsSync(destinationFolderPath)) {
      throw new Error("There is a module with the same name");
    }
    fs.mkdirSync(destinationFolderPath);
    // Lista de archivos que deseas copiar
    const filesToCopy = ['application.service.ts', 'application.repository.ts','application.interface.ts','application.controller.ts'];

    // Copia cada archivo con el nuevo nombre y realiza las modificaciones
    filesToCopy.forEach((fileName) => {
      copyFile(fileName, newName);
    });
    console.log("Ready!")
  }
  catch(error){
    console.log(error.message)
  }
  
}

// Función para copiar archivos con el nuevo nombre
function copyFile(fileName, newName) {
  const sourceFolderPath = path.join(__dirname, 'templates', 'module');
  const sourceFilePath = path.join(sourceFolderPath, fileName);
  const newFileName = fileName.replace('application', newName);
  const destinationFilePath = path.join(setPathDirectory(fileName,newName), newFileName);
  fs.copyFile(sourceFilePath, destinationFilePath, (err) => {
    if (err) {
      console.error(`Error while copying ${fileName}: ${err}`);
    } else {
      console.log(`${newFileName} created`);
      // Realizar modificaciones en el primer archivo
      if (fileName === 'application.service.ts') {
        modifyServiceFile(destinationFilePath, newName);
      }
      // Realizar modificaciones en el segundo archivo
      else if (fileName === 'application.repository.ts') {
        modifyRepositoryFile(destinationFilePath, newName);
      }
      else if (fileName === 'application.interface.ts') {
        modifyInterfaceFile(destinationFilePath, newName);
      }
      else if (fileName === 'application.controller.ts') {
        modifyControllerFile(destinationFilePath, newName);
      }
    }
  });
}

function setPathDirectory(fileName,newName){
  const modulePath = path.join(process.cwd(),'src','App',newName)

  if (fileName === 'application.service.ts') {
    const newPath = path.join(modulePath,"Application");
    
    if (!fs.existsSync(newPath)) {
      fs.mkdirSync(newPath);
    }
    return newPath
  }
  // Realizar modificaciones en el segundo archivo
  else if (fileName === 'application.repository.ts') {
    const newPath = path.join(modulePath,"Infrastructure");
    if (!fs.existsSync(newPath)) {
      fs.mkdirSync(newPath);
    }
    return newPath
  }
  else if (fileName === 'application.interface.ts') {
    const newPath = path.join(modulePath,"Domain","Interfaces");
    const domainPath = path.join(modulePath,"Domain")
    if (!fs.existsSync(domainPath)) {
      fs.mkdirSync(domainPath);
    }
    if (!fs.existsSync(newPath)) {
      fs.mkdirSync(newPath);
    }
    return newPath
  }
  else if (fileName === 'application.controller.ts') {
    const newPath = path.join(modulePath,"Application","Controller");
    if (!fs.existsSync(newPath)) {
      fs.mkdirSync(newPath);
    }
    return newPath
  }
}

// Función para modificar el archivo de servicio
function modifyServiceFile(filePath, newName) {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(`Error while reading: ${err}`);
    } else {
      const capitalize = capitalizeFirstLetter(newName);
      let modifiedData = data.replace(/Application/g, `${capitalize}`);
      modifiedData = modifiedData.replace(/application/g, `${newName}`);
      fs.writeFile(filePath, modifiedData, 'utf8', (err) => {
        if (err) {
          console.error(`Error to write: ${err}`);
        } else {
          //console.log(`Modified File: ${filePath}`);
        }
      });
    }
  });
}

// Función para modificar el archivo de repositorio
function modifyRepositoryFile(filePath, newName) {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(`Error al leer el archivo: ${err}`);
    } else {
      const capitalize = capitalizeFirstLetter(newName);
      let modifiedData = data.replace(/Application/g, `${capitalize}`);
      modifiedData = modifiedData.replace(/application/g, `${newName}`);
      fs.writeFile(filePath, modifiedData, 'utf8', (err) => {
        if (err) {
          console.error(`Error al escribir en el archivo: ${err}`);
        } else {
          //console.log(`Archivo modificado: ${filePath}`);
        }
      });
    }
  });
}

function modifyInterfaceFile(filePath, newName) {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(`Error al leer el archivo: ${err}`);
    } else {
      const capitalize = capitalizeFirstLetter(newName);
      let modifiedData = data.replace(/Application/g, `${capitalize}`);
      modifiedData = modifiedData.replace(/application/g, `${newName}`);
      fs.writeFile(filePath, modifiedData, 'utf8', (err) => {
        if (err) {
          console.error(`Error al escribir en el archivo: ${err}`);
        } else {
          //console.log(`Archivo modificado: ${filePath}`);
        }
      });
    }
  });
}

function modifyControllerFile(filePath, newName) {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(`Error al leer el archivo: ${err}`);
    } else {
      const capitalize = capitalizeFirstLetter(newName);
       let modifiedData = data.replace(/application/g, `${newName}`);
      modifiedData = modifiedData.replace(/ApplicationService/g, `${capitalize}Service`);
      modifiedData = modifiedData.replace(/ApplicationRepository/g, `${capitalize}Repository`);
      modifiedData = modifiedData.replace(/ApplicationController/g, `${capitalize}Controller`);
      fs.writeFile(filePath, modifiedData, 'utf8', (err) => {
        if (err) {
          console.error(`Error al escribir en el archivo: ${err}`);
        } else {
          //console.log(`Archivo modificado: ${filePath}`);
        }
      });
    }
  });
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function moduleNameValidation(name) {
  if (!name) {
    throw new Error('The module name must be a string.');
  }

  if (typeof name !== 'string') {
    throw new Error('The module name must be a string.');
  }

  
  const lowercaseName = name.toLowerCase();

  if (lowercaseName.length > 255) {
    throw new Error('The module name cannot exceed 10 characters.');
  }

  if (!/^[a-z0-9-]+$/.test(lowercaseName)) {
    throw new Error('The module name can only contain lowercase letters, numbers, and the "-" character as a special character.');
  }

  return lowercaseName;
}



module.exports = {createNewModule}