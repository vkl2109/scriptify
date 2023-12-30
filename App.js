import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { RootNavigator } from './Navigation'
import { StatusBar } from 'expo-status-bar';
import { AuthContextProvider } from './Context/AuthContextProvider';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NavigationContainer>
          <StatusBar style="light"/>
          <AuthContextProvider>
            <RootNavigator />
          </AuthContextProvider>
        </NavigationContainer>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}
