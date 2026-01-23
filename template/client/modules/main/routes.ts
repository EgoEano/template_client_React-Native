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
            name: 'Main',
            component: FirstScreen,
        },
        {
            path: 'First',
            name: 'First',
            component: FirstScreen,
        },
        {
            path: 'Second',
            name: 'Second',
            component: SecondScreen,
        },
    ],
};

export default mainRoutes;
