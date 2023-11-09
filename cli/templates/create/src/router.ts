import express, { Request, Response } from 'express';
import {setRoutes} from '@luly/router/router';

//Add your controllers name here
const controllers:any = []
const appRouter = setRoutes(controllers,express.Router())

export default appRouter;


