import React from "react";
import { StatusBar } from "expo-status-bar";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { store } from "./store";
import { backgroundLight } from "./styles/colors";
import LoginScreen from "./components/LoginScreen";
import WorkoutsScreen from "./components/WorkoutsScreen";

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <Provider store={store}>
      <StatusBar
        style="light"
        backgroundColor={backgroundLight}
        animated={true}
        translucent={false}
      />
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginScreen}/>
          <Stack.Screen name="Workouts" component={WorkoutsScreen} options={{ headerBackVisible: false }}/>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};
