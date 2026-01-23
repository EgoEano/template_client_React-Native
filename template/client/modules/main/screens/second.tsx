import React from 'react';
import { View, Text } from '../../../core/ui/components/interfaceComponents';

export function SecondScreen() {
    return (
        <View
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignContent: 'center',
            }}
        >
            <Text colorVariant="secondary">
                Hello React Module 2! This is an example component
            </Text>
        </View>
    );
}
