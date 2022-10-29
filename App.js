import "react-native-gesture-handler";
import React from "react";
import colors from "./assets/colors/colors";
import { loadAsync, useFonts } from "expo-font";
import * as SystemUI from "expo-system-ui";
import * as Font from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "./navigation/AuthStack";
import AppStack from "./navigation/AppStack";

SystemUI.setBackgroundColorAsync(colors.dark2);

const customFonts = {
  "Ubuntu-Regular": require("./assets/fonts/Ubuntu-Regular.ttf"),
  "Ubuntu-Bold": require("./assets/fonts/Ubuntu-Bold.ttf"),
  "Ubuntu-Medium": require("./assets/fonts/Ubuntu-Medium.ttf"),
  "Ubuntu-Italic": require("./assets/fonts/Ubuntu-Italic.ttf"),
  "Ubuntu-Light": require("./assets/fonts/Ubuntu-Light.ttf"),
  "Cera-Black": require("./assets/fonts/ceraroundpro-black.otf"),
  "Cera-Bold": require("./assets/fonts/ceraroundpro-bold.otf"),
  "Cera-Light": require("./assets/fonts/ceraroundpro-light.otf"),
  "Cera-Medium": require("./assets/fonts/ceraroundpro-medium.otf"),
  "Cera-Regular": require("./assets/fonts/ceraroundpro-regular.otf"),
  "Cera-Thin": require("./assets/fonts/ceraroundpro-thin.otf"),
};

export default class App extends React.Component {
  state = {
    fontsLoaded: false,
  };

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();
  }

  render() {
    if (!this.state.fontsLoaded) {
      return null;
    }
    return (
      <NavigationContainer>
        <AppStack />
        {/* <AuthStack /> */}
      </NavigationContainer>
    );
  }
}
