export interface NavigationAdapter {
    navigate: (route: string, params?: any) => void;
    goBack: () => void;
    reset: (config: { index: number; routes: Array<{ name: string }> }) => void;
}

declare const useNavigation: () => NavigationAdapter;
declare const useRoute: () => { params: any; name: string; key: string };

export { useNavigation, useRoute };
