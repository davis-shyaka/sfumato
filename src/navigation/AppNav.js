import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import AuthStack from "../navigation/AuthStack";
import AppStack from "../navigation/AppStack";
import { AuthContext } from "../context/AuthContext";

const AppNav = () => {
  const { isLoading, userToken } = useContext(AuthContext);

  if (isLoading) {
    return (
      <View style={styles.indicatorWrapper}>
        <ActivityIndicator size={"large"} />
      </View>
    );
  }
  return (
    <NavigationContainer>
      {userToken !== null ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  indicatorWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AppNav;
