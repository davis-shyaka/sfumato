import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "../navigation/AuthStack";
import AppStack from "../navigation/AppStack";

const AppNav = () => {
  return (
    <NavigationContainer>
      {/* <AppStack /> */}
      <AuthStack />
    </NavigationContainer>
  );
};

export default AppNav;
