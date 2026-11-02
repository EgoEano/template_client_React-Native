import type { RouteNode, RouteNodePath } from '../core/types/types';
import { createRouteMap } from '../core/utils/routeUtils';

import MainRoutes from './main/routes';
import getAppConfig from '../core/services/utils/appConfigHandler';

export const appRoot: RouteNode = {
    path: '',
    name: 'navigation.root',
    serverBasePath: getAppConfig().urls.serverBasePath, //set path to web app
    options: { navTreeShown: false },
    optionsNavigator: {
        type: 'stack',
        options: {
            headerShown: false,
        },
    },
    children: [
        MainRoutes,
    ],
};

export const routeMap: RouteNodePath = createRouteMap(appRoot);
export default appRoot;