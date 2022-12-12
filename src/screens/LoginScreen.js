import React, { useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "../assets/colors/colors";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import LoginSVG from "../assets/images/misc/login.svg";
import GoogleSVG from "../assets/images/misc/google.svg";
import { AuthContext } from "../context/AuthContext";
import * as Yup from "yup";
import { Formik } from "formik";
import client from "../api/client";
import AppLoader from "../components/AppLoader";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [token, setToken] = useState(null);

  const { login, isLoading, setIsLoading } = useContext(AuthContext);

  const userInfo = {
    email: "",
    password: "",
  };

  const SignInSchema = Yup.object({
    email: Yup.string().email().required("Email is required"),
    password: Yup.string()
      .trim()
      .min(7, "Password is too short")
      .required("Password is required!"),
  });

  const signIn = async (values, formikActions) => {
    setIsLoading(true);
    // console.log(values);
    try {
      const res = await client.post("/signIn", {
        ...values,
      });
      console.log("After sign in: ", res.data);
      if (res.data.success === false) {
        alert(res.data.message);
      }
      if (res.data.success) {
        login({ res });
      }
      // console.log(res.data);

      formikActions.resetForm();
      formikActions.setSubmitting(false);
      setIsLoading(false);
    } catch (error) {
      console.log("Error during sign in: ", error.message);
    }
  };
  return (
    <>
      <SafeAreaView style={styles.loginWrapper}>
        <ScrollView showsVerticalScrollIndicator={false}>
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
            <Formik
              initialValues={userInfo}
              validationSchema={SignInSchema}
              onSubmit={signIn}
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
                const { email, password } = values;
                return (
                  <>
                    {/* Login Body */}
                    {errors.email ? (
                      <Text
                        style={{
                          color: colors.magneta,
                          alignSelf: "flex-start",
                          marginLeft: "10%",
                          marginBottom: "5%",
                        }}
                      >
                        {errors.email}
                      </Text>
                    ) : null}
                    <View style={styles.userInputWrapper}>
                      <MaterialIcons
                        name="alternate-email"
                        size={20}
                        color={colors.yellow}
                      />
                      <TextInput
                        value={email}
                        errors={touched.email && errors.email}
                        onChangeText={handleChange("email")}
                        onBlur={handleBlur("email")}
                        style={styles.userInput}
                        placeholder="Email"
                        placeholderTextColor={colors.white}
                        keyboardType="email-address"
                        autoCapitalize="none"
                      />
                    </View>
                    {errors.password ? (
                      <Text
                        style={{
                          color: colors.magneta,
                          alignSelf: "flex-start",
                          marginLeft: "10%",
                          marginBottom: "5%",
                        }}
                      >
                        {errors.password}
                      </Text>
                    ) : null}
                    <View style={styles.userInputWrapper}>
                      <Ionicons
                        name="ios-lock-closed-outline"
                        size={20}
                        color={colors.yellow}
                      />
                      <TextInput
                        value={password}
                        errors={touched.password && errors.password}
                        onChangeText={handleChange("password")}
                        onBlur={handleBlur("password")}
                        style={styles.userInput}
                        placeholder="Password"
                        placeholderTextColor={colors.white}
                        secureTextEntry={true}
                      />
                      <TouchableOpacity onPress={() => {}}>
                        <Text style={{ color: colors.cyan, fontWeight: "700" }}>
                          Forgot?
                        </Text>
                      </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                      onPress={!isSubmitting ? handleSubmit : null}
                      disabled={isSubmitting}
                      style={[
                        styles.loginButton,
                        { opacity: isSubmitting ? 0.4 : 1 },
                      ]}
                    >
                      <Text style={styles.loginText}>Login</Text>
                    </TouchableOpacity>
                  </>
                );
              }}
            </Formik>
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
        </ScrollView>
      </SafeAreaView>
      {isLoading ? <AppLoader /> : null}
    </>
  );
};

const styles = StyleSheet.create({
  loginWrapper: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: colors.dark2,
    padding: 10,
    marginTop: "5%",
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
