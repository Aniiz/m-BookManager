import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'


// Pages:
import Cadastrar from './src/pages/Cadastrar'
import List from './src/pages/List';

const Stack = createStackNavigator();

export default function App() {


  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='List'>
        <Stack.Screen name="List" options={{ headerShown: false }} component={List} />
        <Stack.Screen name="Cadastrar" options={{ headerShown: false }} component={Cadastrar} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


