import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "../assets/colors/colors";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import LoginSVG from "../assets/images/misc/login.svg";
import GoogleSVG from "../assets/images/misc/google.svg";
import { AuthContext } from "../context/AuthContext";

const LoginScreen = ({ navigation }) => {
  const { test } = useContext(AuthContext);
  return (
    <SafeAreaView style={styles.loginWrapper}>
      {/* SVG */}
      <View style={styles.loginSVG}>
        <LoginSVG height={300} width={300} />
      </View>
      {/* Login Section */}
      {/* Title */}

      <Text style={styles.loginTitle}>Login</Text>
      {/* Login Body */}
      <View style={styles.loginBody}>
        <TouchableOpacity style={styles.otherOptionsLogin}>
          <GoogleSVG height={30} width={30} />
        </TouchableOpacity>

        {/* Other Login Options */}
        <Text style={styles.otherOptionsText}>Or log in with...</Text>
        <View style={styles.userInputWrapper}>
          <MaterialIcons
            name="alternate-email"
            size={20}
            color={colors.yellow}
          />
          <TextInput
            style={styles.userInput}
            placeholder="Email"
            placeholderTextColor={colors.magneta}
            keyboardType="email-address"
          />
        </View>
        <View style={styles.userInputWrapper}>
          <Ionicons
            name="ios-lock-closed-outline"
            size={20}
            color={colors.yellow}
          />
          <TextInput
            style={styles.userInput}
            placeholder="Password"
            placeholderTextColor={colors.magneta}
            secureTextEntry={true}
          />
          <TouchableOpacity onPress={() => {}}>
            <Text style={{ color: colors.cyan, fontWeight: "700" }}>
              Forgot?
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => {}} style={styles.loginButton}>
          <Text style={styles.loginText}>Log In</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.callToRegister}>
        <Text
          style={{
            color: colors.white,
            marginRight: 10,
            fontFamily: "Cera-Regular",
          }}
        >
          New to the Community?
        </Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Register");
          }}
        >
          <Text
            style={{
              color: colors.cyan,
              fontFamily: "Cera-Medium",
              fontWeight: "700",
            }}
          >
            Register
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  loginWrapper: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: colors.dark2,
    padding: 10,
  },
  loginSVG: {
    alignItems: "center",
  },
  loginTitle: {
    color: colors.white,
    fontFamily: "Cera-Medium",
    fontSize: 28,
    marginBottom: 20,
    alignSelf: "center",
  },
  loginBody: {
    marginHorizontal: 20,
    alignItems: "center",
    borderColor: colors.green,
    borderWidth: 0.3,
    borderRadius: 10,
    paddingVertical: 20,
    marginBottom: 20,
  },
  otherOptionsLogin: {
    borderColor: colors.cyan,
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  otherOptionsText: { color: colors.white, marginBottom: 20 },
  userInputWrapper: {
    flexDirection: "row",
    padding: 10,
    marginBottom: 20,
    marginHorizontal: 30,
    borderColor: colors.cyan,
    borderWidth: 0.5,
    borderRadius: 10,
  },
  userInput: {
    flex: 1,
    paddingVertical: 0,
    color: colors.white,
    marginLeft: 5,
  },
  loginButton: {
    backgroundColor: colors.green,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  loginText: {
    fontFamily: "Cera-Regular",
    color: colors.dark2,
    fontSize: 16,
    fontWeight: "700",
  },
  callToRegister: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 50,
  },
});
export default LoginScreen;
