import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CustomDrawer from "../components/CustomDrawer";
import ProfileScreen from "../screens/ProfileScreen";
import NotificationsScreen from "../screens/NotificationsScreen";
import WishListScreen from "../screens/WishListScreen";
import SettingsScreen from "../screens/SettingsScreen";
import Ionicons from "react-native-vector-icons/Ionicons";
import colors from "../assets/colors/colors";
import TabNavigator from "./TabNavigator";
import EditProfileScreen from "../screens/EditProfileScreen";

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const AppStack = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: colors.dark2,
          marginTop: 20,
          borderTopRightRadius: 30,
          borderBottomRightRadius: 30,
        },
        drawerActiveBackgroundColor: colors.green,
        drawerActiveTintColor: colors.yellow,
        drawerInactiveTintColor: colors.cyan,
        drawerLabelStyle: {
          fontFamily: "Cera-Medium",
          fontSize: 16,
          marginLeft: -20,
        },
      }}
    >
      <Drawer.Screen
        component={TabNavigator}
        name="Home"
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="home-outline" size={24} color={color} />
          ),
        }}
      />
      {/* <Drawer.Screen
        component={ProfileScreen}
        name="Profile"
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="person-circle-outline" size={24} color={color} />
          ),
        }}
      /> */}
      <Drawer.Screen
        component={NotificationsScreen}
        name="Notifications"
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="notifications-outline" size={24} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        component={WishListScreen}
        name="Wish List"
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="cart-outline" size={24} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        component={SettingsScreen}
        name="Settings"
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="settings-outline" size={24} color={color} />
          ),
        }}
      />

      {/* <Stack.Screen component={EditProfileScreen} name="EditProfile" /> */}
    </Drawer.Navigator>
  );
};

// const styles = StyleSheet.create({
//   drawLabel: { fontFamily: "Cera-Light" },
// });

export default AppStack;
