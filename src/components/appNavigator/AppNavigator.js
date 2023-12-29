import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../Pages/Home";
import GameSetup from "../Pages/GameSetup";
import Game from "../Pages/Game";
import GameOver from "../Pages/GameOver";

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
        <Stack.Screen name="Game" component={Game} />
        <Stack.Screen name="Game Over" component={GameOver} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
