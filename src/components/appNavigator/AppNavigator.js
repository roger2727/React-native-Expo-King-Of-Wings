import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../Pages/Home";
import GameSetup from "../Pages/GameSetup";

const Stack = createStackNavigator();

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="Home"
      >
        <Stack.Screen name="Welcome" component={Home} />

        <Stack.Screen name="Game Setup" component={GameSetup} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
