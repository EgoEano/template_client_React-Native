import { useNavigation as useReactNavigation, useRoute as useReactRoute } from '@react-navigation/native';

export const useNavigation = () => {
    const navigation = useReactNavigation<any>();

    return {
        navigate: (route: string, params?: any) => {
            navigation.navigate(route as never, params);
        },
        goBack: () => {
            navigation.goBack();
        },
        reset: (config: { index: number; routes: Array<{ name: string }> }) => {
            navigation.reset(config);
        },
        // Expose the original navigation object for advanced use
        _original: navigation,
    };
};

export const useRoute = () => {
    return useReactRoute<any>();
};