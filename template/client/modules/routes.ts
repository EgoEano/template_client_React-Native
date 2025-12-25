import type { RouteNode } from '../core/types/types';

import MainRoutes from './main/routes'

const appRoot: RouteNode = {
    path: '',
    serverBaseName: 'server', //set path to web app
    optionsNavigator: {
        type: 'stack',
        options: {
            headerShown: false,
        }
    },
    children: [
        MainRoutes,
    ]
};

export default appRoot;