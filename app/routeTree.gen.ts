/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as IndexImport } from './routes/index'
import { Route as UsersZIndexImport } from './routes/usersZ/index'
import { Route as UsersIndexImport } from './routes/users/index'

// Create/Update Routes

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const UsersZIndexRoute = UsersZIndexImport.update({
  id: '/usersZ/',
  path: '/usersZ/',
  getParentRoute: () => rootRoute,
} as any)

const UsersIndexRoute = UsersIndexImport.update({
  id: '/users/',
  path: '/users/',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/users/': {
      id: '/users/'
      path: '/users'
      fullPath: '/users'
      preLoaderRoute: typeof UsersIndexImport
      parentRoute: typeof rootRoute
    }
    '/usersZ/': {
      id: '/usersZ/'
      path: '/usersZ'
      fullPath: '/usersZ'
      preLoaderRoute: typeof UsersZIndexImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/users': typeof UsersIndexRoute
  '/usersZ': typeof UsersZIndexRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/users': typeof UsersIndexRoute
  '/usersZ': typeof UsersZIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/users/': typeof UsersIndexRoute
  '/usersZ/': typeof UsersZIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '/users' | '/usersZ'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/users' | '/usersZ'
  id: '__root__' | '/' | '/users/' | '/usersZ/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  UsersIndexRoute: typeof UsersIndexRoute
  UsersZIndexRoute: typeof UsersZIndexRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  UsersIndexRoute: UsersIndexRoute,
  UsersZIndexRoute: UsersZIndexRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/users/",
        "/usersZ/"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/users/": {
      "filePath": "users/index.tsx"
    },
    "/usersZ/": {
      "filePath": "usersZ/index.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
