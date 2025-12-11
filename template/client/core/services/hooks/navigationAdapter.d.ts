export interface NavigationAdapter {
    navigate: (route: string, params?: any) => void;
    goBack: () => void;
    reset: (config: { index: number; routes: Array<{ name: string }> }) => void;
}

declare const useNavigation: () => NavigationAdapter;

export { useNavigation };
