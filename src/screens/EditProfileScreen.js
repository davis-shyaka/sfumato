import React, { useContext, useEffect, useState } from "react";

import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  ImageBackground,
  TextInput,
} from "react-native";
import Animated from "react-native-reanimated";
import BottomSheet from "reanimated-bottom-sheet";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";

import * as ImagePicker from "expo-image-picker";

import colors from "../assets/colors/colors";
import { AuthContext } from "../context/AuthContext";
import client from "../api/client";
import { StackActions } from "@react-navigation/native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import AppLoader from "../components/AppLoader";
import UploadProgress from "../components/UploadProgress";

const EditProfileScreen = ({ navigation }) => {
  const { userInfo, userToken } = useContext(AuthContext);
  const [progress, setProgress] = useState(0);
  const [profileImage, setProfileImage] = useState(null);
  const { isLoading, setIsLoading } = useContext(AuthContext);

  console.log(userInfo);
  //   console.log(userToken);

  //   Picking an image from the phone library
  const openImageLibrary = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    console.log(status);
    if (status !== "granted") {
      alert("Sorry; we need camera roll permissions for this to work.");
    }

    if (status === "granted") {
      const response = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [7, 7],
        quality: 1,
      });

      // console.log(response);
      // console.log(response.uri);

      if (!response.cancelled) {
        setProfileImage(response.uri);
      }
    }
  };

  //   Uploading the image to cloudinary to get a link
  const uploadProfileImage = async () => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("profile", {
      name: new Date() + "_profile",
      uri: profileImage,
      type: "image/jpg",
    });
    try {
      const response = await client.post("/uploadProfile", formData, {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
          authorization: `JWT ${userToken}`,
        },
        onUploadProgress: ({ loaded, total }) => setProgress(loaded / total),
      });

      console.log("After upload:...");
      console.log(response.data);
      if (response.data.success) {
        try {
          // Before re-directing to a differrent screen, I want to update the local storage here

          navigation.dispatch(StackActions.replace("Profile2", {}));
        } catch (error) {
          console.log("Error tring to redirect: ", error.message);
        }
      }
    } catch (error) {
      console.log("Error while uploading: ", error.message);
    }
    setIsLoading(false);
  };

  //   Prompt to update image bottom screen
  const renderInner = () => (
    <View style={styles.panel}>
      <View style={{ alignItems: "center" }}>
        <Text style={styles.panelTitle}>Upload Photo</Text>
        <Text style={styles.panelSubtitle}>Choose Your Avatar</Text>
      </View>

      <TouchableOpacity style={styles.panelButton} onPress={openImageLibrary}>
        <Text style={styles.panelButtonTitle}>Choose From Library</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.panelButton}
        onPress={() => bs.current.snapTo(1)}
      >
        <Text style={styles.panelButtonTitle}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle} />
      </View>
    </View>
  );

  const bs = React.createRef();
  const fall = new Animated.Value(1);

  return (
    <>
      <View style={styles.container}>
        <BottomSheet
          ref={bs}
          snapPoints={[330, 0]}
          renderContent={renderInner}
          renderHeader={renderHeader}
          initialSnap={1}
          callbackNode={fall}
          enabledGestureInteraction={true}
        />
        <Animated.View
          style={{
            margin: 20,
            backgroundColor: colors.dark,
            borderRadius: 20,
            padding: 20,
            opacity: Animated.add(0.1, Animated.multiply(fall, 1.0)),
          }}
        >
          <View style={{ alignItems: "center" }}>
            <TouchableOpacity onPress={() => bs.current.snapTo(0)}>
              <View
                style={{
                  height: 100,
                  width: 100,
                  borderRadius: 20,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: colors.dark2,
                }}
              >
                <ImageBackground
                  source={{
                    uri: profileImage,
                  }}
                  style={{
                    height: 150,
                    width: 150,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  imageStyle={{ borderRadius: 15, marginVertical: 20 }}
                >
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Icon
                      name="camera"
                      size={35}
                      color={colors.green}
                      style={{
                        opacity: 0.7,
                        alignItems: "center",
                        justifyContent: "center",
                        borderWidth: 1,
                        borderColor: colors.cyan,
                        borderRadius: 10,
                        padding: 20,
                      }}
                    />
                  </View>
                </ImageBackground>
              </View>
            </TouchableOpacity>
            <Text
              style={{
                marginVertical: 20,
                fontSize: 18,
                fontFamily: "Cera-Regular",
                color: colors.white,
              }}
            >
              {userInfo.surname.toUpperCase() + " " + userInfo.givenName}
            </Text>
          </View>

          <View style={styles.action}>
            <FontAwesome name="user-o" color={colors.text} size={20} />
            <TextInput
              placeholder="Surname"
              placeholderTextColor={colors.gray}
              autoCorrect={false}
              style={[
                styles.textInput,
                {
                  color: colors.white,
                },
              ]}
            />
          </View>
          <View style={styles.action}>
            <FontAwesome name="user-o" color={colors.text} size={20} />
            <TextInput
              placeholder="Given Name"
              placeholderTextColor={colors.gray}
              autoCorrect={false}
              style={[
                styles.textInput,
                {
                  color: colors.white,
                },
              ]}
            />
          </View>
          {/* <View style={styles.action}>
          <Feather name="phone" color={colors.text} size={20} />
          <TextInput
            placeholder="Phone"
            placeholderTextColor={colors.gray}
            keyboardType="number-pad"
            autoCorrect={false}
            style={[
              styles.textInput,
              {
                color: colors.white,
              },
            ]}
          />
        </View>
        <View style={styles.action}>
          <FontAwesome name="envelope-o" color={colors.text} size={20} />
          <TextInput
            placeholder="Email"
            placeholderTextColor={colors.gray}
            keyboardType="email-address"
            autoCorrect={false}
            style={[
              styles.textInput,
              {
                color: colors.white,
              },
            ]}
          />
        </View>
        <View style={styles.action}>
          <FontAwesome name="globe" color={colors.text} size={20} />
          <TextInput
            placeholder="Country"
            placeholderTextColor={colors.gray}
            autoCorrect={false}
            style={[
              styles.textInput,
              {
                color: colors.white,
              },
            ]}
          />
        </View>
        <View style={styles.action}>
          <Icon name="map-marker-outline" color={colors.text} size={20} />
          <TextInput
            placeholder="City"
            placeholderTextColor={colors.gray}
            autoCorrect={false}
            style={[
              styles.textInput,
              {
                color: colors.white,
              },
            ]}
          />
        </View> */}
          <TouchableOpacity
            style={styles.commandButton}
            onPress={uploadProfileImage}
          >
            <Text style={styles.panelButtonTitle}>Submit</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
      {progress ? <UploadProgress process={progress} /> : null}
    </>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.dark2,
    paddingVertical: 20,
  },
  commandButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: colors.green,
    alignItems: "center",
    marginTop: 10,
  },
  panel: {
    padding: 20,
    backgroundColor: colors.dark,
    paddingTop: 20,
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    // shadowColor: '#000000',
    // shadowOffset: {width: 0, height: 0},
    // shadowRadius: 5,
    // shadowOpacity: 0.4,
  },
  header: {
    backgroundColor: colors.yellow,
    shadowColor: "#333333",
    shadowOffset: { width: -1, height: -3 },
    shadowRadius: 2,
    shadowOpacity: 0.4,
    // elevation: 5,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: "center",
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.cyan,
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
    color: colors.white,
  },
  panelSubtitle: {
    fontSize: 14,
    color: colors.green,
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: colors.green,
    alignItems: "center",
    marginVertical: 10,
    marginHorizontal: 50,
  },
  panelButtonTitle: {
    fontSize: 20,
    fontFamily: "Cera-Bold",
    color: colors.dark2,
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#FF0000",
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
    color: "#05375a",
  },
});
