// app.jsx

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import WelcomeScreen from './WelcomeScreen';
import HomeScreen from './HomeScreen';
import LoadingScreen from './LoadingScreen';
import ErrorScreen from './ErrorScreen';
import PlayerScreen from './PlayerScreen';
import MusicScreen from './MusicScreen';
import VideoScreen from './VideoScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Loading" component={LoadingScreen} />
        <Stack.Screen name="Error" component={ErrorScreen} />
        <Stack.Screen name="Player" component={PlayerScreen} />
        <Stack.Screen name="Music" component={MusicScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Video" component={VideoScreen} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
