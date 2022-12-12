import React, { useState, useEffect, useRef, useContext } from "react";
import {
  // Text,
  View,
  Button,
  Platform,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import colors from "../assets/colors/colors";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {
  Avatar,
  Title,
  Caption,
  Text,
  TouchableRipple,
} from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthContext } from "../context/AuthContext";
import client from "../api/client";

export default function ProfileScreen() {
  const { userInfo, userToken } = useContext(AuthContext);
  // console.log(userInfo);
  // console.log(userToken);
  const [refreshing, setRefreshing] = useState(true);
  const [currentData, setCurrentData] = useState(userInfo);

  useEffect(() => {
    fetchData();
  }, [currentData]);

  const fetchData = async () => {
    try {
      const res = await client.get(`/users/${userInfo.id}`);
      let data = res.data;
      setCurrentData(data);
      setRefreshing(false);
    } catch (error) {
      console.log("Error fetching api: ", error.message);
    }
  };

  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <View style={styles.userInfoSection}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 15,
            }}
          >
            <Avatar.Image
              source={{
                uri: userInfo.avatar,
              }}
              size={120}
            />
            <View style={{ marginLeft: 15 }}>
              <Title
                style={[
                  styles.title,
                  {
                    marginTop: 15,
                    marginBottom: 5,
                  },
                ]}
              >
                {currentData.surname.toUpperCase()}
              </Title>
              <Caption style={styles.caption}>{currentData.givenName}</Caption>
            </View>
          </View>
        </View>

        <View style={styles.userInfoSection}>
          <View style={styles.row}>
            <Icon name="map-marker-radius" color={colors.white} size={20} />
            {userInfo.location ? (
              <Text style={{ color: colors.white, marginLeft: 20 }}>
                {userInfo.location}
              </Text>
            ) : (
              <Text style={{ color: colors.white, marginLeft: 20 }}>
                No Location Set
              </Text>
            )}
          </View>
          <View style={styles.row}>
            <Icon name="phone" color={colors.white} size={20} />
            {userInfo.phone ? (
              <Text style={{ color: colors.white, marginLeft: 20 }}>
                {userInfo.phone}
              </Text>
            ) : (
              <Text style={{ color: colors.white, marginLeft: 20 }}>
                No Phone Registered
              </Text>
            )}
          </View>
          <View style={styles.row}>
            <Icon name="email" color={colors.white} size={20} />
            <Text style={{ color: colors.white, marginLeft: 20 }}>
              {userInfo.email}
            </Text>
          </View>
        </View>

        <View style={styles.infoBoxWrapper}>
          <View
            style={[
              styles.infoBox,
              {
                borderRightColor: colors.cyan,
                borderRightWidth: 1,
              },
            ]}
          >
            {/* <Title>₹140.50</Title> */}
            {/* <Caption>Wallet</Caption> */}
          </View>
          <View style={styles.infoBox}>
            {/* <Title>12</Title> */}
            {/* <Caption>Orders</Caption> */}
          </View>
        </View>

        <View style={styles.menuWrapper}>
          <TouchableRipple onPress={() => {}}>
            <View style={styles.menuItem}>
              <Icon name="heart-outline" color={colors.yellow} size={25} />
              <Text style={styles.menuItemText}>Your Favorites</Text>
            </View>
          </TouchableRipple>
          <TouchableRipple onPress={() => {}}>
            <View style={styles.menuItem}>
              <Icon name="credit-card" color={colors.green} size={25} />
              <Text style={styles.menuItemText}>Payment</Text>
            </View>
          </TouchableRipple>
          <TouchableRipple onPress={() => {}}>
            <View style={styles.menuItem}>
              <Icon
                name="account-check-outline"
                color={colors.cyan}
                size={25}
              />
              <Text style={styles.menuItemText}>Support</Text>
            </View>
          </TouchableRipple>
          <TouchableRipple onPress={() => {}}>
            <View style={styles.menuItem}>
              <Icon name="delete" color={colors.magneta} size={25} />
              <Text style={styles.menuItemText}>Delete Account</Text>
            </View>
          </TouchableRipple>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.dark2,
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  title: {
    fontSize: 24,
    fontFamily: "Cera-Bold",
    color: colors.white,
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    color: colors.white,
    fontFamily: "Cera-Light",
  },
  row: {
    flexDirection: "row",
    marginBottom: 10,
  },
  infoBoxWrapper: {
    borderBottomColor: colors.cyan,
    borderBottomWidth: 1,
    borderTopColor: colors.cyan,
    borderTopWidth: 1,
    flexDirection: "row",
    height: 100,
  },
  infoBox: {
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
  menuWrapper: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: "row",
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: colors.white,
    marginLeft: 20,
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 26,
  },
});
