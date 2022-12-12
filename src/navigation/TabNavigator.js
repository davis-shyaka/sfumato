import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import AddItemsScreen from "../screens/AddItemsScreen";
import CommunityScreen from "../screens/CommunityScreen";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import LibraryScreen from "../screens/LibraryScreen";
import Ionicons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";
import colors from "../assets/colors/colors";
import { StyleSheet, View } from "react-native";
import * as SystemUI from "expo-system-ui";
import ArtDetailsScreen from "../screens/ArtDetailsScreen";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import ImageUpload from "../components/ImageUpload";
import ProfileScreen from "../screens/ProfileScreen";
import FeaturedScreen from "../screens/FeaturedScreen";
import UpdateItemsScreen from "../screens/UpdateItemsScreen";
import EditProfileScreen from "../screens/EditProfileScreen";
import Icon from "react-native-vector-icons/Ionicons";

SystemUI.setBackgroundColorAsync(colors.dark2);
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const ProfileStack = createNativeStackNavigator();

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
const FeaturedStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
      <Stack.Screen
        component={FeaturedScreen}
        name="Featured"
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
      <Stack.Screen
        component={UpdateItemsScreen}
        name="UpdateItems"
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
        name="Featured2"
        component={FeaturedStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="feature-search"
              color={color}
              size={size}
            />
          ),
        }}
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
        name="Profile"
        component={ProfileStackScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
      {/* <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      /> */}
    </Tab.Navigator>
  );
};

export default TabNavigator;

const ProfileStackScreen = ({ navigation }) => {
  // const {colors} = useTheme();

  return (
    <ProfileStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.dark,
          shadowColor: colors.magneta, // iOS
          elevation: 0, // Android
        },
        headerTintColor: colors.white,
      }}
    >
      <ProfileStack.Screen
        name="Profile2"
        component={ProfileScreen}
        options={{
          title: "",
          headerStyle: {
            backgroundColor: colors.dark,
            // borderRadius: 20,
            // innerWidth: 10,
          },
          headerLeft: () => (
            <View style={{ marginLeft: 10 }}>
              <Icon
                name="ios-menu"
                size={25}
                color={colors.cyan}
                onPress={() => navigation.openDrawer()}
              />
            </View>
          ),
          headerRight: () => (
            <View style={{ marginRight: 10 }}>
              <MaterialCommunityIcons
                name="account-edit"
                size={25}
                color={colors.yellow}
                onPress={() => navigation.navigate("EditProfile")}
              />
            </View>
          ),
        }}
      />
      <ProfileStack.Screen
        name="EditProfile"
        options={{
          title: "Edit Profile",
        }}
        component={EditProfileScreen}
      />
    </ProfileStack.Navigator>
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
