const routeMetadataKey = "rutas";

export function getRoutes(target: any): any{
    const routes:any = [];
    const proto = target.prototype;
    for (const key of Object.getOwnPropertyNames(proto)) {
      if(key!='constructor'){
        const target2 = Object.getOwnPropertyDescriptors(proto)[key]['value'];
        const routeInfo = Reflect.getMetadata(routeMetadataKey, target2 , key);
        console.log('routeInfo es',routeInfo)
        if (routeInfo) {
          routes.push({ method: routeInfo.method, path: routeInfo.path, key, middleware:routeInfo.middleware });
        }
      }
      
    }
  
    return routes;
  }
  
  export function setRoutes(controllers:any,router:any): any{
    for (const controller of controllers) {
      console.log("ejecutandose1")
      const routes = getRoutes(controller);
      console.log(routes)
      for (const route of routes) {
        console.log('ejecutandose2')
        const { method, path, key, middleware } = route;
        console.log()
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