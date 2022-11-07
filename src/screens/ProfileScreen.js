import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import React, { useState, useEffect, useRef } from "react";
import {
  Text,
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

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function ProfileScreen() {
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        backgroundColor: colors.dark2,
        marginTop: "5%",
      }}
    >
      <View style={styles.headingWrapper}>
        <MaterialCommunityIcons
          name="account-circle"
          size={40}
          color={colors.magneta}
        />
        <Text style={styles.headingText}>Profile</Text>
      </View>

      <View style={styles.staticInfoWrapper}>
        <View style={styles.staticInfoHeader}>
          <MaterialCommunityIcons
            name="account-circle"
            size={20}
            color={colors.magneta}
          />
          <Text style={styles.staticInfoTextHeader}>KATUREBE Beni Noel</Text>
        </View>
        <Text style={styles.staticInfoTextBody}>{expoPushToken}</Text>
      </View>

      <View style={styles.notificationsBody}>
        {/* <ScrollView></ScrollView> */}
        <View style={styles.dynamicInfo}>
          <View
            style={{
              alignItems: "flex-start",
              paddingVertical: 20,
            }}
          >
            <View style={styles.notificationMessageItem}>
              <View style={styles.notificationMessageHeader}>
                <Ionicons
                  name="notifications-circle"
                  size={20}
                  color={colors.magneta}
                />
                <Text numberOfLines={1} style={styles.notificationMessageTitle}>
                  {notification && notification.request.content.title}{" "}
                </Text>
              </View>
              <View style={styles.notificationMessageBody}>
                <Text style={styles.notificationMessageBodyText}>
                  {notification && notification.request.content.body}
                </Text>
                <Text>
                  {notification &&
                    JSON.stringify(notification.request.content.data.data)}
                </Text>
              </View>
            </View>
            {/* <Text>
              Title: {notification && notification.request.content.title}{" "}
            </Text>
            <Text>
              Body: {notification && notification.request.content.body}
            </Text>
            <Text>
              Data:{" "}
              {notification &&
                JSON.stringify(notification.request.content.data)}
            </Text> */}
          </View>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={async () => {
            await schedulePushNotification();
          }}
        >
          <Text style={styles.buttonText}>Tap to receive a mission</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Mail📬",
      body: "There is a Judas among us",
      data: {
        data: "The Eternal Wall has been breached. Reported details soon to follow",
      },
    },
    trigger: { seconds: 2 },
  });
}

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert("Must use physical device for Push Notifications");
  }

  return token;
}

const styles = StyleSheet.create({
  headingWrapper: {
    backgroundColor: colors.yellow,
    padding: "1%",
    paddingHorizontal: "10%",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginVertical: "10%",
  },
  headingText: {
    fontFamily: "Cera-Bold",
    color: colors.black,
    fontSize: 18,
  },
  notificationsBody: {
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 10,
  },
  staticInfoWrapper: {
    marginVertical: 20,
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 20,
  },
  staticInfoHeader: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: 5,
    borderBottomColor: colors.cyan,
    borderBottomWidth: 1,
  },
  staticInfoTextHeader: {
    fontFamily: "Cera-Bold",
    fontSize: 18,
    marginLeft: 5,
  },
  staticInfoTextBody: {
    fontFamily: "Cera-Light",
    fontSize: 14,
    marginTop: 10,
  },
  notificationMessageItem: {
    backgroundColor: colors.cyan,
    borderRadius: 20,
    padding: 10,
    // width: 300,
  },
  notificationMessageHeader: {
    flexDirection: "row",
  },
  notificationMessageTitle: {
    fontFamily: "Cera-Bold",
    fontSize: 18,
    marginLeft: 5,
  },
  notificationMessageBody: {
    marginTop: 10,
  },
  notificationMessageBodyText: {
    fontFamily: "Cera-Light",
    fontSize: 16,
  },
  button: {
    backgroundColor: colors.dark,
    borderRadius: 30,
    padding: 20,
    alignItems: "center",
  },
  buttonText: {
    color: colors.white,
    fontFamily: "Cera-Bold",
    fontSize: 18,
  },
});
