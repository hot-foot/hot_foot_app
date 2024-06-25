import { FontProvider } from "./context/fontContext";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./screen/Home/homeScreen";
import SettingScreen from "./screen/Setting/settingScreen";
import ProcessScreen from "./screen/Process/processScreen";
import TimerScreen from "./screen/Timer/timerScreen";
import CompleteScreen from "./screen/Complete/completeScreen";
const Stack = createStackNavigator();

function Navigation() {
  return (
    <FontProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName="Home"
        >
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Setting" component={SettingScreen} />
          <Stack.Screen name="Process" component={ProcessScreen} />
          <Stack.Screen name="Timer" component={TimerScreen} />
          <Stack.Screen name="Complete" component={CompleteScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </FontProvider>
  );
}

export default Navigation;
