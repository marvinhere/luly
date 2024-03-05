import 'reflect-metadata'


const routeMetadataKey = "rutas";


export function Middleware(middleware: Array<any>): Function {
  return function (target: any, key: any) {
    //Guardar metadata del midleware
    Reflect.defineMetadata(routeMetadataKey, { middleware }, target, key.name);
  };
}

/**
 * 
 * Router is used as a global Route
 */
export function Router(path:string): Function {
  return function (target: any, key: any) {
    path = path.replace(/^\/+|\/+$/g, '');
    //obtengo el metadata y el middleware que se le agrego a la clase (ruta global)
    const routerMetadata = Reflect.getMetadata(routeMetadataKey,target,key.name) || []
    const middlewareForRoute = routerMetadata.middleware || []
    
    for (let nameKey of Object.getOwnPropertyNames(target.prototype)) {
      //El target es la clase
      if(nameKey!='constructor'){
        //Evitamos el constructor y solo obtenemos las funciones
        //target2 obtiene la funcion que utiliza un decorador
        const target2 = Object.getOwnPropertyDescriptors(target.prototype)[nameKey]['value'];
        

        //Metadata contiene el method, path y middleware que utiliza esa funcion. El middleware se hereda desde que usa el decorador middleware
        const metadata = Reflect.getMetadata(routeMetadataKey, target2, nameKey);

        //Juntamos los middleware de las rutas y del Router global
        const middleware = [...middlewareForRoute,...metadata.middleware]
        //Limpiamos el path para quitar los / de al principio y final porque en defnineMetadata lo organizamos de forma correcta
        let subpath = metadata.path;
        subpath = subpath.replace(/^\/+|\/+$/g, '');
        Reflect.defineMetadata(routeMetadataKey,{path:"/"+path+"/"+subpath,method:metadata.method,middleware:middleware},target2,nameKey)
      }
     
      
    }
    
   // 
  };
}

export function Get(path: string): Function {
  return function (target: any, key: any) {
    path = path.replace(/^\/+|\/+$/g, '');
    path = "/"+path
    //Aqui obtento le middleware que se le agrego a esta ruta
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
