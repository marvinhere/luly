#!/usr/bin/env node
const yargs = require('yargs');
const { createNewModule } = require('./createModule');
const { createNewProject } = require('./createProject');
const { build } = require('./builder');

yargs.command('new <projectName>', 'Create a new Project', (yargs) => {
  yargs.positional('projectName', {
    describe: 'The name of the project to create',
    type: 'string',
  });
}, async (argv) => {
  const projectName = argv.projectName;
  createNewProject(projectName);
});

yargs.command('create <type> <moduleName>', 'Create a new module', (yargs) => {
  yargs.positional('type',{
    describe: 'Type of creation',
    type: 'string'
  })

  yargs.positional('moduleName', {
    describe: 'The name of the module to create',
    type: 'string',
  });
}, async (argv) => {
  switch(argv.type){
    case 'module':
      const moduleName = argv.moduleName;
      await createNewModule(moduleName);
    break;
    default: 
      console.log(">Sorry, the command you entered does not exist. Please double-check your command and try again.");
    break;
  }
  
});

yargs.command('build', 'Build the project', (yargs) => {
}, async (argv) => {
  build();
});


yargs.argv;

