import {Get, Post, Delete, Put, Router, Middleware} from "@luly/router/decorator";
import { ApplicationService } from "../../Application/application.service";
import { ApplicationRepository } from "../application.repository";

export class ApplicationController{

    applicationService:ApplicationService;

    constructor(){
        
        const applicationRepository = new ApplicationRepository();
        this.applicationService = new ApplicationService(applicationRepository)
    }

    /**
     * WARNING: Before use add this controller in project/src/router.ts
     */
    
}


