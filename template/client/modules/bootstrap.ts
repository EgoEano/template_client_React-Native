import { Platform } from 'react-native';
import { AppModuleBootstrap } from '../core/types/types';

let modulesPromise: Promise<AppModuleBootstrap[]> | undefined;

export function loadModules() {
    const isNative = Platform.OS === 'android' || Platform.OS === 'ios';
    const isInlineWeb = process.env.INLINE === 'true';

    if (!modulesPromise) {
        if (isNative || isInlineWeb) {
            modulesPromise = Promise.resolve([
                require('./main/bootstrap'),
            ]);
        } else {
            modulesPromise = Promise.all([
                import('./main/bootstrap'),
            ]);
        }
    }

    return modulesPromise;
}