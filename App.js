import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { RootNavigator } from './Navigation'
import { StatusBar } from 'expo-status-bar';
import { AuthContextProvider } from './Context/AuthContextProvider';

export default function App() {
  return (
    <SafeAreaProvider>
        <NavigationContainer>
          <StatusBar style="light"/>
          <AuthContextProvider>
            <RootNavigator />
          </AuthContextProvider>
        </NavigationContainer>
    </SafeAreaProvider>
  );
}
