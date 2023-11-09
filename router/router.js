"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setRoutes = exports.getRoutes = void 0;
const routeMetadataKey = "rutas";
function getRoutes(target) {
    const routes = [];
    const proto = target.prototype;
    for (const key of Object.getOwnPropertyNames(proto)) {
        if (key != 'constructor') {
            const target2 = Object.getOwnPropertyDescriptors(proto)[key]['value'];
            const routeInfo = Reflect.getMetadata(routeMetadataKey, target2, key);
            console.log('routeInfo es', routeInfo);
            if (routeInfo) {
                routes.push({ method: routeInfo.method, path: routeInfo.path, key, middleware: routeInfo.middleware });
            }
        }
    }
    return routes;
}
exports.getRoutes = getRoutes;
function setRoutes(controllers, router) {
    for (const controller of controllers) {
        console.log("ejecutandose1");
        const routes = getRoutes(controller);
        console.log(routes);
        for (const route of routes) {
            console.log('ejecutandose2');
            const { method, path, key, middleware } = route;
            console.log();
            const func = controller.prototype[key];
            if (middleware.length != 0) {
                router[method](path, middleware, func);
            }
            else {
                router[method](path, func);
            }
        }
    }
    return router;
}
exports.setRoutes = setRoutes;
