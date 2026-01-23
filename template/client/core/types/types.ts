import type React from 'react';
import type { NativeStackNavigationOptions } from '@react-navigation/native-stack';

declare global {
    interface Window {
        root: import('react-dom/client').Root;
    }
}

export type RouteNode = {
    path: string;
    serverBasePath?: string; // Use only in appRoot node for server base name
    name?: string; // Optional: explicit mobile screen name (auto-generated if not provided)
    component?: React.ComponentType<unknown>;
    children?: RouteNode[];
    optionsNavigator?: NavigatorOptions;
    options?: unknown;
};

export type StackType = 'stack' | 'tabs' | 'drawer' | null | undefined;
export type NavigatorOptions = {
    type: StackType;
    options: NativeStackNavigationOptions;
};
