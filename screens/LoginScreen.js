import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const LoginScreen = () => {
  return (
    <SafeAreaView style={styles.loginWrapper}>
      <View>
        <Text>LoginScreen</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  loginWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default LoginScreen;
