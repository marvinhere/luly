import 'reflect-metadata';


const routeMetadataKey = "rutas";


export function Middleware(middleware: Array<any>): Function {
  return function (target: any, key: any) {
    Reflect.defineMetadata(routeMetadataKey, { middleware }, target, key.name);
  };
}

export function Router(path:string): Function {
  return function (target: any, key: any) {
    path = path.replace(/^\/+|\/+$/g, '');
    for (let nameKey of Object.getOwnPropertyNames(target.prototype)) {
      
      if(nameKey!='constructor'){
        const target2 = Object.getOwnPropertyDescriptors(target.prototype)[nameKey]['value'];
        const metadata = Reflect.getMetadata(routeMetadataKey, target2, nameKey);
        let subpath = metadata.path;
        subpath = subpath.replace(/^\/+|\/+$/g, '');
        Reflect.defineMetadata(routeMetadataKey,{path:"/"+path+"/"+subpath,method:metadata.method,middleware:metadata.middleware},target2,nameKey)
      }
     
      
    }
    
   // 
  };
}

export function Get(path: string): Function {
  return function (target: any, key: any) {
    path = path.replace(/^\/+|\/+$/g, '');
    path = "/"+path
    const metadata = Reflect.getMetadata(routeMetadataKey,target,key.name) || []
    //path = `${generalPath.path}/${path}`;
    Reflect.defineMetadata(routeMetadataKey, { method: 'get', path, middleware:metadata.middleware ??[]}, target, key.name);

  };
}

export function Post(path:string):Function{
 
  return function (target:any, key:any){
    path = path.replace(/^\/+|\/+$/g, '');
    path = "/"+path
    const metadata = Reflect.getMetadata(routeMetadataKey,target,key.name) || []
    Reflect.defineMetadata(routeMetadataKey,{ method: 'post', path,middleware:metadata.middleware ??[]}, target, key.name)
  }
}

export function Put(path:string):Function{
  
  return function (target:any, key:any){
    path = path.replace(/^\/+|\/+$/g, '');
    path = "/"+path
    const metadata = Reflect.getMetadata(routeMetadataKey,target,key.name) || []
    Reflect.defineMetadata(routeMetadataKey,{ method: 'put', path,middleware:metadata.middleware ??[]}, target, key.name)
  }
}

export function Delete(path:string):Function{
  return function (target:any, key:any){
    path = path.replace(/^\/+|\/+$/g, '');
    path = "/"+path
    const metadata = Reflect.getMetadata(routeMetadataKey,target,key.name) || []
    Reflect.defineMetadata(routeMetadataKey,{ method: 'delete', path,middleware:metadata.middleware ??[]}, target, key.name)
  }
}
