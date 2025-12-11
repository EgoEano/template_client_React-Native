import React from 'react';
import { View, Text } from '../../../core/ui/components/interfaceComponents';

export function FirstScreen() {
  return (
    <View style={{ display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
      <Text>Hello React Module 1! This is an example component</Text>
    </View>
  );
}