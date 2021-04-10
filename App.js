import React from "react";
import WelcomeScreen from "./screens/welcomeScreen";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { AppDrawerNavigator } from "./components/appDrawerNavigator";

export default function App() {
  return <AppContainer />;
}

const switchNaviagtor = createSwitchNavigator({
  WelcomeScreen: { screen: WelcomeScreen },
  Drawer: { screen: AppDrawerNavigator },
});

const AppContainer = createAppContainer(switchNaviagtor);
