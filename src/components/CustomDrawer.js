import React, { useContext } from "react";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";
import colors from "../assets/colors/colors";
import background from "../assets/images/gallery/the-disguise.jpg";
import profile from "../assets/images/gallery/friday.jpg";
import Ionicons from "react-native-vector-icons/Ionicons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AuthContext } from "../context/AuthContext";

const CustomDrawer = (props) => {
  const { logout, userInfo } = useContext(AuthContext);
  return (
    <View style={styles.drawerWrapper}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={styles.drawerStyles}
      >
        {/* Background Image for the Drawer */}
        <ImageBackground source={background} style={styles.backgroundImage}>
          {/* User Profile Image */}
          <Image
            style={styles.profileImage}
            source={{ uri: userInfo.avatar }}
          />
          {/* User Name */}
          <Text style={styles.profileText}>
            {userInfo.surname.toUpperCase() + " " + userInfo.givenName}
          </Text>
        </ImageBackground>
        {/* Screen Names List */}
        <View style={styles.screenList}>
          <DrawerItemList label={{}} {...props} />
        </View>
      </DrawerContentScrollView>
      <View style={styles.bottomDrawerSection}>
        <TouchableOpacity onPress={() => {}} style={styles.CTA}>
          <View style={styles.tellAFriend}>
            <Ionicons
              name="share-social-outline"
              size={24}
              color={colors.green}
            />
            <Text style={styles.tellAFriendText}>Tell a friend about us</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            logout();
          }}
          style={styles.CTA}
        >
          <View style={styles.tellAFriend}>
            <Ionicons name="exit-outline" size={24} color={colors.magneta} />
            <Text style={styles.tellAFriendText}>Log Out</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  drawerWrapper: {
    flex: 1,
  },
  drawerStyles: {
    // backgroundColor: colors.dark,
  },
  backgroundImage: {
    paddingVertical: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  profileImage: {
    height: 100,
    width: 100,
    borderColor: colors.cyan,
    borderWidth: 2,
    borderRadius: 20,
  },
  profileText: {
    color: colors.white,
    borderBottomColor: colors.magneta,
    borderBottomWidth: 3,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginVertical: 15,
  },
  screenList: {
    flex: 1,
    // backgroundColor: colors.dark,
    paddingVertical: 10,
  },
  bottomDrawerSection: {
    padding: 20,
    borderTopColor: colors.magneta,
    borderTopWidth: 0.5,
  },
  tellAFriend: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  tellAFriendText: {
    color: colors.white,
    marginLeft: 10,
    fontFamily: "Cera-Bold",
    fontSize: 14,
  },
});
export default CustomDrawer;
