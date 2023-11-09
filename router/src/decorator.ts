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
        console.log("datos son",target2,nameKey)
        Reflect.defineMetadata(routeMetadataKey,{path:"/"+path+"/"+metadata.path,method:metadata.method,middleware:metadata.middleware},target2,nameKey)
      }
     
      
    }
    
   // 
  };
}

export function Get(path: string): Function {
  return function (target: any, key: any) {
    path = path.replace(/^\/+|\/+$/g, '');
    const metadata = Reflect.getMetadata(routeMetadataKey,target,key.name) || []
    console.log('metadata',key.name,metadata)
    //path = `${generalPath.path}/${path}`;
    Reflect.defineMetadata(routeMetadataKey, { method: 'get', path, middleware:metadata.middleware ??[]}, target, key.name);
    console.log('nombre',2)
  };
}

export function Post(path:string):Function{
  path = path.replace(/^\/+|\/+$/g, '');
  return function (target:any, key:any){
    Reflect.defineMetadata(routeMetadataKey,{ method: 'post', path}, target, key.name)
  }
}

export function Put(path:string):Function{
  path = path.replace(/^\/+|\/+$/g, '');
  return function (target:any, key:any){
    Reflect.defineMetadata(routeMetadataKey,{ method: 'put', path}, target, key.name)
  }
}

export function Delete(path:string):Function{
  path = path.replace(/^\/+|\/+$/g, '');
  return function (target:any, key:any){
    Reflect.defineMetadata(routeMetadataKey,{ method: 'delete', path}, target, key.name)
  }
}
