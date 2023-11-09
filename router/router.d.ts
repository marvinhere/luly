declare module '@luly/router/router' {
    export const routeMetadataKey: string;
  
    export function getRoutes(target: any): any;
  
    export function setRoutes(controllers: any, router: any): any;
  }
  