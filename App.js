import { NavigationContainer } from '@react-navigation/native';
import { RootNavigator } from './Navigation'

export default function App() {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}
