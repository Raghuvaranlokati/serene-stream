// ErrorScreen.jsx
import React from 'react';
import { View, Text, Button } from 'react-native';

export default function ErrorScreen() {
  return (
    <View>
      <Text>Error: Unable to load content</Text>
      <Button title="Retry" onPress={() => navigation.goBack()} />
    </View>
  );
}
