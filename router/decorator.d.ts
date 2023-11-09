declare module '@luly/router/decorator' {
    export const routeMetadataKey: string;
  
    export function Middleware(middleware: any[]): (target: any, key: any) => void;
  
    export function Router(path: string): (target: any, key: any) => void;
  
    export function Get(path: string): (target: any, key: any) => void;
  
    export function Post(path: string): (target: any, key: any) => void;
  
    export function Put(path: string): (target: any, key: any) => void;
  
    export function Delete(path: string): (target: any, key: any) => void;
  }
  