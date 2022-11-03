import "react-native-gesture-handler";
import React from "react";
import colors from "./src/assets/colors/colors";
import * as SystemUI from "expo-system-ui";
import * as Font from "expo-font";

import AuthProvider from "./src/context/AuthContext";
import AppNav from "./src/navigation/AppNav";

SystemUI.setBackgroundColorAsync(colors.dark2);

const customFonts = {
  "Ubuntu-Regular": require("./src/assets/fonts/Ubuntu-Regular.ttf"),
  "Ubuntu-Bold": require("./src/assets/fonts/Ubuntu-Bold.ttf"),
  "Ubuntu-Medium": require("./src/assets/fonts/Ubuntu-Medium.ttf"),
  "Ubuntu-Italic": require("./src/assets/fonts/Ubuntu-Italic.ttf"),
  "Ubuntu-Light": require("./src/assets/fonts/Ubuntu-Light.ttf"),
  "Cera-Black": require("./src/assets/fonts/ceraroundpro-black.otf"),
  "Cera-Bold": require("./src/assets/fonts/ceraroundpro-bold.otf"),
  "Cera-Light": require("./src/assets/fonts/ceraroundpro-light.otf"),
  "Cera-Medium": require("./src/assets/fonts/ceraroundpro-medium.otf"),
  "Cera-Regular": require("./src/assets/fonts/ceraroundpro-regular.otf"),
  "Cera-Thin": require("./src/assets/fonts/ceraroundpro-thin.otf"),
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
      <AuthProvider>
        <AppNav />
      </AuthProvider>
    );
  }
}
