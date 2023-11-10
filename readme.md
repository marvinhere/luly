# Luly: Basic Backend Development Framework with Hexagonal Architecture based on Express

## Global Installation

    npm install -g @luly/cli

## Create a new project

    luly new project-name

## Add a new module

    luly create module module-name
This command creates a module structure:

    module-name
        |----Application
        |     |----module-name.service.ts
        |----Domain
        |     |----Interfaces
        |            |----module-name.interface.ts
        |----Infrastructure
            |----Controller
            |       |----module-name.controller.ts
            |----module-name.repository.ts

## Controllers

Controllers for each module are created when generating the module. To use these controllers, you need to register them in the `router.ts` of the project, located at `project-name/src/router.ts`.

    //router.ts
    // Add your controllers here
    const controllers = [UserController];
    const appRouter = setRoutes(controllers, express.Router());

These controllers use decorators to define routes and middlewares.
### Router

Use `@Router('path')` to specify a general route for the controller. Use it before the class.
Example:

    @Router("user")
    export class UserController {
    }

#### Methods

You can use the following decorators to define method routes:

-   `@Post('path')`
-   `@Get('path')`
-   `@Put('path')`
-   `@Delete('path')`

The `path` in decorators follows Express logic, so you can pass parameters in the same way, like `@Get('user/:id')`.

When using decorators, methods inherit `req`, `res`, and `next` from Express.

Example:

    @Post('user')
    createUser(req, res, next) {
        const { name, last_name } = req.body;
        res.send({
            message: "User created successfully"
        });
    }
    
### Middleware

The `@Middleware([])` decorator takes an array of middlewares as a parameter. These middlewares run before each method in the order they are listed. This decorator should be placed after the method's decorator and before the method itself.

Example:

    @Get('user')
    @Middleware([authMiddleware, secondMiddleware])
    getUser(req, res, next) {
    }

Middleware example:

    //authMiddleware.ts
    function authMiddleware(req, res, next) {
        //your code here
        next();
    }
    export default authMiddleware;

## Build

To compile the project, use the following command:

    luly build
Compiled files are generated by default in `/dist`. You can configure `tsconfig.json` to change the output dir.

## CLI

The `luly.config.json` file is only necessary to specify the main project path to Luly. The contents of `luly.config.json` are not used in the framework; this file is only used for verification of being in the main path of a Luly project. In the future, it may be used to add necessary information.