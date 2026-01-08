import { useNavigate, useSearchParams } from 'react-router-dom';

export const useNavigation = () => {
    const navigate = useNavigate();

    return {
        navigate: (route: string, params?: any) => {
            // For web, navigate to the route
            // params are typically handled differently in react-router-dom
            const targetPath = route.startsWith('/') ? route : `/${route}`;
            if (params) {
                navigate(targetPath, { state: params });
            } else {
                navigate(targetPath);
            }
        },
        goBack: () => {
            navigate(-1);
        },
        reset: (config: { index: number; routes: Array<{ name: string }> }) => {
            // For web, navigate to the first route in the config
            if (config.routes && config.routes.length > 0) {
                const targetRoute = config.routes[config.index]?.name || config.routes[0].name;
                navigate(`/${targetRoute}`, { replace: true });
            }
        },
    };
};

export const useRoute = () => {
    const [searchParams] = useSearchParams();
    return Object.fromEntries(searchParams.entries());
};