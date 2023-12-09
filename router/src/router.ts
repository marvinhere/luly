
const routeMetadataKey = "rutas";

  export function getRoutes(controllers: any[]): any {
    const routes: any = [];
    for (const controller of controllers) {
      const controllerInst = new controller();
      const proto = controller.prototype;
      for (const key of Object.getOwnPropertyNames(proto)) {
        if (key !== 'constructor') {
          const target2 = Object.getOwnPropertyDescriptors(proto)[key]['value'];
          const routeInfo = Reflect.getMetadata(routeMetadataKey, target2, key);
          if (routeInfo) {
            routes.push({
              method: routeInfo.method,
              path: routeInfo.path,
              key,
              middleware: routeInfo.middleware,
              controller: controllerInst, // Almacena la instancia del controlador
            });
          }
        }
      }
    }
  
    return routes;
  }
  
  export function setRoutes(controllers: any[], router: any): any {
    for (const route of getRoutes(controllers)) {
      const { method, path, key, middleware, controller } = route;
      const func = controller[key].bind(controller); // Usa bind para asegurar de que 'this' sea el controlador
      if (middleware.length !== 0) {
        router[method](path, middleware, func);
      } else {
        router[method](path, func);
      }
    }
    return router;
  }
  