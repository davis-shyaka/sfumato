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
import { ErrorMessage, Formik } from "formik";
import * as Yup from "yup";

const RegisterScreen = ({ navigation }) => {
  const userInfo = {
    surname: "",
    givenName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const SignupSchema = Yup.object({
    surname: Yup.string()
      .trim()
      .min(3, "Too short!")
      .required("Your Surname is required"),
    givenName: Yup.string()
      .trim()
      .min(2, "Too short!")
      .required("Your Name is required"),
    email: Yup.string().email().required("Email is required"),
    password: Yup.string()
      .trim()
      .min(7, "Password is too short")
      .required("Password is required!"),
    confirmPassword: Yup.string().equals(
      [Yup.ref("password"), null],
      "The passwords do not match"
    ),
  });
  return (
    <SafeAreaView style={styles.loginWrapper}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* SVG */}
        <View style={styles.loginSVG}>
          <RegistrationSVG height={300} width={300} />
        </View>
        {/* Register Section */}
        {/* Title */}
        <Text style={styles.loginTitle}>Register</Text>
        <View style={styles.loginBody}>
          <TouchableOpacity style={styles.otherOptionsLogin}>
            <GoogleSVG height={30} width={30} />
          </TouchableOpacity>
        </View>
        <Formik
          initialValues={userInfo}
          validationSchema={SignupSchema}
          onSubmit={(values, formikActions) => {
            setTimeout(() => {
              console.log(values);
              formikActions.resetForm();
              formikActions.setSubmitting(false);
            }, 1000);
          }}
        >
          {({
            values,
            errors,
            touched,
            isSubmitting,
            handleChange,
            handleBlur,
            handleSubmit,
          }) => {
            // console.log(values);
            const { surname, givenName, email, password, confirmPassword } =
              values;
            return (
              <>
                {/* Login Body */}
                <View style={styles.loginBody}>
                  {/* Other Register Options */}
                  <Text style={styles.otherOptionsText}>
                    Or register with...
                  </Text>
                  <View style={styles.userInputWrapper}>
                    <MaterialIcons
                      name="person-outline"
                      size={20}
                      color={colors.yellow}
                    />
                    <TextInput
                      value={surname}
                      // error={touched.surname && errors.surname}
                      onChangeText={handleChange("surname")}
                      onBlur={handleBlur("surname")}
                      style={styles.userInput}
                      placeholder="Surname"
                      placeholderTextColor={colors.white}
                    />
                    {errors.surname ? (
                      <Text
                        style={{
                          color: colors.magneta,
                          alignItems: "center",
                        }}
                      >
                        {errors.surname}
                      </Text>
                    ) : null}
                  </View>

                  <View style={styles.userInputWrapper}>
                    <MaterialIcons
                      name="person-outline"
                      size={20}
                      color={colors.yellow}
                    />
                    <TextInput
                      value={givenName}
                      onChangeText={handleChange("givenName")}
                      style={styles.userInput}
                      placeholder="Given Name(s)"
                      placeholderTextColor={colors.white}
                    />
                    {errors.givenName ? (
                      <Text
                        style={{
                          color: colors.magneta,
                          alignItems: "center",
                        }}
                      >
                        {errors.givenName}
                      </Text>
                    ) : null}
                  </View>
                  <View style={styles.userInputWrapper}>
                    <MaterialIcons
                      name="alternate-email"
                      size={20}
                      color={colors.yellow}
                    />
                    <TextInput
                      value={email}
                      onChangeText={handleChange("email")}
                      style={styles.userInput}
                      placeholder="Email"
                      placeholderTextColor={colors.white}
                      keyboardType="email-address"
                    />
                    {errors.email ? (
                      <Text
                        style={{
                          color: colors.magneta,
                          alignItems: "center",
                        }}
                      >
                        {errors.email}
                      </Text>
                    ) : null}
                  </View>
                  <View style={styles.userInputWrapper}>
                    <Ionicons
                      name="ios-lock-closed-outline"
                      size={20}
                      color={colors.yellow}
                    />
                    <TextInput
                      value={password}
                      onChangeText={handleChange("password")}
                      style={styles.userInput}
                      placeholder="Password"
                      placeholderTextColor={colors.white}
                      secureTextEntry={true}
                    />
                    {errors.password ? (
                      <Text
                        style={{
                          color: colors.magneta,
                          alignItems: "center",
                        }}
                      >
                        {errors.password}
                      </Text>
                    ) : null}
                  </View>
                  <View style={styles.userInputWrapper}>
                    <Ionicons
                      name="ios-lock-closed-outline"
                      size={20}
                      color={colors.yellow}
                    />
                    <TextInput
                      value={confirmPassword}
                      onChangeText={handleChange("confirmPassword")}
                      style={styles.userInput}
                      placeholder="Confirm Password"
                      placeholderTextColor={colors.white}
                      secureTextEntry={true}
                    />
                    {errors.confirmPassword ? (
                      <Text
                        style={{
                          color: colors.magneta,
                          alignItems: "center",
                        }}
                      >
                        {errors.confirmPassword}
                      </Text>
                    ) : null}
                  </View>

                  <TouchableOpacity
                    onPress={!isSubmitting ? handleSubmit : null}
                    disabled={isSubmitting}
                    style={styles.loginButton}
                  >
                    <Text style={styles.loginText}>Register</Text>
                  </TouchableOpacity>
                </View>
              </>
            );
          }}
        </Formik>

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
  otherOptionsText: {
    color: colors.white,
    marginBottom: 20,
    fontFamily: "Cera-Medium",
    fontSize: 16,
  },
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
