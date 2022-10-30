import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "../assets/colors/colors";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import RegistrationSVG from "../assets/images/misc/registration.svg";
import GoogleSVG from "../assets/images/misc/google.svg";

const RegisterScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.loginWrapper}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* SVG */}
        <View style={styles.loginSVG}>
          <RegistrationSVG height={300} width={300} />
        </View>
        {/* Login Section */}
        {/* Title */}
        <Text style={styles.loginTitle}>Register</Text>
        {/* Login Body */}
        <View style={styles.loginBody}>
          <TouchableOpacity style={styles.otherOptionsLogin}>
            <GoogleSVG height={30} width={30} />
          </TouchableOpacity>

          {/* Other Register Options */}
          <Text style={styles.otherOptionsText}>Or register with...</Text>
          <View style={styles.userInputWrapper}>
            <MaterialIcons
              name="person-outline"
              size={20}
              color={colors.yellow}
            />
            <TextInput
              style={styles.userInput}
              placeholder="Surname"
              placeholderTextColor={colors.magneta}
            />
          </View>
          <View style={styles.userInputWrapper}>
            <MaterialIcons
              name="person-outline"
              size={20}
              color={colors.yellow}
            />
            <TextInput
              style={styles.userInput}
              placeholder="Given Name(s)"
              placeholderTextColor={colors.magneta}
            />
          </View>
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
          </View>
          <View style={styles.userInputWrapper}>
            <Ionicons
              name="ios-lock-closed-outline"
              size={20}
              color={colors.yellow}
            />
            <TextInput
              style={styles.userInput}
              placeholder="Confirm Password"
              placeholderTextColor={colors.magneta}
              secureTextEntry={true}
            />
          </View>

          <TouchableOpacity onPress={() => {}} style={styles.loginButton}>
            <Text style={styles.loginText}>Register</Text>
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
            Already part of the Community?
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Text
              style={{
                color: colors.cyan,
                fontFamily: "Cera-Medium",
                fontWeight: "700",
              }}
            >
              Log in
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
export default RegisterScreen;
