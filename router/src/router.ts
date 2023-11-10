const routeMetadataKey = "rutas";

export function getRoutes(target: any): any{
    const routes:any = [];
    const proto = target.prototype;
    for (const key of Object.getOwnPropertyNames(proto)) {
      if(key!='constructor'){
        const target2 = Object.getOwnPropertyDescriptors(proto)[key]['value'];
        const routeInfo = Reflect.getMetadata(routeMetadataKey, target2 , key);
        
        if (routeInfo) {
          routes.push({ method: routeInfo.method, path: routeInfo.path, key, middleware:routeInfo.middleware });
        }
      }
      
    }
  
    return routes;
  }
  
  export function setRoutes(controllers:any,router:any): any{
    for (const controller of controllers) {
      const routes = getRoutes(controller);
      for (const route of routes) {
        const { method, path, key, middleware } = route;
        const func = controller.prototype[key];
        if(middleware.length!=0){
          router[method](path,middleware,func);
        }else{
          router[method](path,func);
        }
        
      }
    }
    return router;
  }