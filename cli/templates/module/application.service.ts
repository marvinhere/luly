import { IApplicationRepository } from "../Domain/Interfaces/application.interface";

export class ApplicationService{
    applicationRepository:IApplicationRepository;
    constructor(applicationRepository:IApplicationRepository){
        this.applicationRepository = applicationRepository;
    }
}