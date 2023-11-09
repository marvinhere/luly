"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Delete = exports.Put = exports.Post = exports.Get = exports.Router = exports.Middleware = void 0;
require("reflect-metadata");
const routeMetadataKey = "rutas";
function Middleware(middleware) {
    return function (target, key) {
        Reflect.defineMetadata(routeMetadataKey, { middleware }, target, key.name);
    };
}
exports.Middleware = Middleware;
function Router(path) {
    return function (target, key) {
        path = path.replace(/^\/+|\/+$/g, '');
        for (let nameKey of Object.getOwnPropertyNames(target.prototype)) {
            if (nameKey != 'constructor') {
                const target2 = Object.getOwnPropertyDescriptors(target.prototype)[nameKey]['value'];
                const metadata = Reflect.getMetadata(routeMetadataKey, target2, nameKey);
                console.log("datos son", target2, nameKey);
                Reflect.defineMetadata(routeMetadataKey, { path: "/" + path + "/" + metadata.path, method: metadata.method, middleware: metadata.middleware }, target2, nameKey);
            }
        }
        // 
    };
}
exports.Router = Router;
function Get(path) {
    return function (target, key) {
        var _a;
        path = path.replace(/^\/+|\/+$/g, '');
        const metadata = Reflect.getMetadata(routeMetadataKey, target, key.name) || [];
        console.log('metadata', key.name, metadata);
        //path = `${generalPath.path}/${path}`;
        Reflect.defineMetadata(routeMetadataKey, { method: 'get', path, middleware: (_a = metadata.middleware) !== null && _a !== void 0 ? _a : [] }, target, key.name);
        console.log('nombre', 2);
    };
}
exports.Get = Get;
function Post(path) {
    path = path.replace(/^\/+|\/+$/g, '');
    return function (target, key) {
        Reflect.defineMetadata(routeMetadataKey, { method: 'post', path }, target, key.name);
    };
}
exports.Post = Post;
function Put(path) {
    path = path.replace(/^\/+|\/+$/g, '');
    return function (target, key) {
        Reflect.defineMetadata(routeMetadataKey, { method: 'put', path }, target, key.name);
    };
}
exports.Put = Put;
function Delete(path) {
    path = path.replace(/^\/+|\/+$/g, '');
    return function (target, key) {
        Reflect.defineMetadata(routeMetadataKey, { method: 'delete', path }, target, key.name);
    };
}
exports.Delete = Delete;
