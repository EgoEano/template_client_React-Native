import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';

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
                const targetRoute =
                    config.routes[config.index]?.name || config.routes[0].name;
                navigate(`/${targetRoute}`, { replace: true });
            }
        },
    };
};

export const useRoute = () => {
    const location = useLocation();
    const [searchParams] = useSearchParams();

    // Get URL query params
    const urlParams = Object.fromEntries(searchParams.entries());

    // Merge URL params with state params, state takes precedence
    const mergedParams = {
        ...urlParams,
        ...(location.state || {}),
    };

    return {
        params: mergedParams,
        name: location.pathname,
        key: location.key,
    };
};
