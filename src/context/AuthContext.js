import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  const login = ({ res }) => {
    setIsLoading(true);

    let userInfo = res.data.user;
    // console.log(userInfo);
    setUserInfo(userInfo);
    setUserToken(res.data.token);
    AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));
    AsyncStorage.setItem("userToken", res.data.token);

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
      console.log(userInfo);
      // userInfo = JSON.parse(userInfo);
      console.log(userInfo);
      if (userInfo) {
        setUserToken(userToken);
        setUserInfo(userInfo);
      }
      setIsLoading(false);
    } catch (e) {
      console.log(`isLoggedIn error ${e}`);
    }
  };

  const fetchApi = async () => {
    try {
      const res = await axios.get("http://192.168.1.64:8000/");
      console.log(res.data);
    } catch (error) {
      console.log("Error fetching api: ", error.message);
    }
  };

  useEffect(() => {
    fetchApi();
    // isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{ login, logout, isLoading, setIsLoading, userToken, userInfo }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
