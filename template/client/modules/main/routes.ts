import { RouteNode } from '../../core/types/types';
import { FirstScreen } from './screens/first';
import { SecondScreen } from './screens/second';

const mainRoutes: RouteNode = {
    path: '',
    optionsNavigator: {
        type: 'tabs',
        options: {
            headerShown: false,
        },
    },
    children: [
        {
            path: '',
            component: FirstScreen,
        },
        {
            path: 'First',
            component: FirstScreen,
        },
        {
            path: 'Second',
            component: SecondScreen,
        },
    ],
};

export default mainRoutes;
