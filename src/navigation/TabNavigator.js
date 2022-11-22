import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import AddItemsScreen from "../screens/AddItemsScreen";
import CommunityScreen from "../screens/CommunityScreen";
import LibraryScreen from "../screens/LibraryScreen";
import Ionicons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";
import colors from "../assets/colors/colors";
import { StyleSheet } from "react-native";
import * as SystemUI from "expo-system-ui";
import ArtDetailsScreen from "../screens/ArtDetailsScreen";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import ImageUpload from "../components/ImageUpload";

SystemUI.setBackgroundColorAsync(colors.dark2);
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
      <Stack.Screen
        component={HomeScreen}
        name="Home"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        component={ArtDetailsScreen}
        name="ArtDetails"
        options={({ route }) => ({
          title: route.params?.title,
          headerShown: false,
        })}
      />
    </Stack.Navigator>
  );
};

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.yellow,
        tabBarActiveBackgroundColor: colors.dark2,
        tabBarInactiveBackgroundColor: colors.dark,
        tabBarInactiveTintColor: colors.cyan,
        tabBarHideOnKeyboard: true,
        tabBarItemStyle: {},
        tabBarStyle: {
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50,
          borderRadius: 20,
        },
      }}
    >
      <Tab.Screen
        name="Home2"
        component={HomeStack}
        options={({ route }) => ({
          tabBarStyle: { display: getTabBarVisibility(route) },
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" color={color} size={size} />
          ),
        })}
      />
      <Tab.Screen
        name="AddItems"
        component={AddItemsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="md-add-circle" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Library"
        component={LibraryScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="library-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Community"
        component={CommunityScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="planet-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Upload"
        component={ImageUpload}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="planet-outline" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});

const getTabBarVisibility = (route) => {
  const routeName = getFocusedRouteNameFromRoute(route) ?? "Feed";

  if (routeName == "ArtDetails") {
    return "none";
  }

  return "flex";
};

export default TabNavigator;
