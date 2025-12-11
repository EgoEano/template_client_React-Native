import React, { ReactNode } from "react";
import { LanguageProvider } from './languageProviderService';
import { SystemDataProvider } from './systemDataProviderService';
import { StyleProvider } from './styleProvider';
import { StorageProvider } from './storageProvider';
import { NotificationProvider } from './notificationProvider';

export function SuperProvider({ children }: { children: ReactNode }) {
    return (
        <>
            <SystemDataProvider>
                <StyleProvider>
                    <LanguageProvider>
                        <NotificationProvider>
                            <StorageProvider>
                                {children}
                            </StorageProvider>
                        </NotificationProvider>
                    </LanguageProvider>
                </StyleProvider>
            </SystemDataProvider>
        </>
    );
}