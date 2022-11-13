import AsyncStorage from "@react-native-async-storage/async-storage";
import axios, { Axios } from "axios";
import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  const login = (username, password) => {
    setIsLoading(true);
    setUserToken("iofgjbyhbgdhg");
    // Axios.post(`$BASE_URL/jwt-auth/v1/token`, { username, password })
    //   .then((res) => {
    //     console.log(res.data);
    //     let userInfo = res.data;
    //     setUserInfo(userInfo);
    //     setUserToken(userInfo.data.token);
    //     AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));
    //     AsyncStorage.setItem("userToken", userInfo.daya.token);
    //   })
    //   .catch((e) => {
    //     console.log(`Login error ${e}`);
    //   });

    setIsLoading(false);
  };

  const logout = () => {
    setIsLoading(true);
    setUserToken(null);
    AsyncStorage.removeItem("userInfo");
    AsyncStorage.removeItem("userToken");
    setIsLoading(false);
  };

  const isLoggedIn = async () => {
    try {
      setIsLoading(true);
      let userInfo = await AsyncStorage.getItem("userInfo");
      let userToken = await AsyncStorage.getItem("userToken");
      userInfo = JSON.parse(userInfo);

      if (userInfo) {
        setUserToken(userToken);
        setUserInfo(userInfo);
      }
      setIsLoading(false);
    } catch (e) {
      console.log(`isLoggedIn error ${e}`);
    }
  };

  // useEffect(() => {
  //   isLoggedIn();
  // }, []);
  return (
    <AuthContext.Provider
      value={{ login, logout, isLoading, userToken, userInfo }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
