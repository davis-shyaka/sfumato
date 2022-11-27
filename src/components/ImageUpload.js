import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import React, { useContext } from "react";
import colors from "../assets/colors/colors";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import client from "../api/client";
import { StackActions } from "@react-navigation/native";
import { AuthContext } from "../context/AuthContext";
import AppLoader from "./AppLoader";
import UploadProgress from "./UploadProgress";

const ImageUpload = (props) => {
  const [profileImage, setProfileImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const { token } = props.route.params;
  const { isLoading, setIsLoading } = useContext(AuthContext);

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

      if (!response.cancelled) {
        setProfileImage(response.uri);
      }
    }
  };

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
          authorization: `JWT ${token}`,
        },
        onUploadProgress: ({ loaded, total }) => setProgress(loaded / total),
      });

      // console.log(response.data);
      if (response.data.success) {
        try {
          props.navigation.dispatch(StackActions.replace("Login", {}));
        } catch (error) {
          console.log("Error tring to redirect: ", error.message);
        }
      }
      setIsLoading(false);
    } catch (error) {
      console.log("Error while uploading: ", error.message);
    }
  };
  return (
    <>
      <View style={styles.container}>
        <View>
          <View>
            <TouchableOpacity
              onPress={openImageLibrary}
              style={styles.uploadBtn}
            >
              {profileImage ? (
                <Image
                  source={{ uri: profileImage }}
                  style={{ width: "100%", height: "100%" }}
                />
              ) : (
                <View
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  <Text style={styles.uploadBtnText}>Upload Your Avatar</Text>
                  <Text style={styles.uploadBtnSymbol}>+</Text>
                </View>
              )}
            </TouchableOpacity>
            <Text style={styles.skip}>Skip</Text>
            {profileImage && (
              <View>
                <TouchableOpacity onPress={uploadProfileImage}>
                  <Text
                    style={[
                      styles.skip,
                      {
                        backgroundColor: colors.green,
                        paddingVertical: 10,
                        color: colors.black,
                        borderRadius: 10,
                        fontFamily: "Cera-Bold",
                        fontSize: 18,
                      },
                    ]}
                  >
                    Upload
                  </Text>
                </TouchableOpacity>

                {progress ? (
                  <Text
                    style={{
                      color: colors.green,
                      marginTop: 20,
                      textAlign: "center",
                    }}
                  >
                    {progress}
                  </Text>
                ) : null}
              </View>
            )}
          </View>
        </View>
      </View>
      {progress ? <UploadProgress process={progress} /> : null}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.dark2,
    marginTop: "5%",
  },
  uploadBtn: {
    height: 150,
    width: 150,
    borderRadius: 150 / 2,
    justifyContent: "center",
    alignItems: "center",
    borderStyle: "dashed",
    borderWidth: 1,
    overflow: "hidden",
    borderColor: colors.yellow,
    padding: "2%",
    overflow: "hidden",
  },
  uploadBtnText: {
    color: colors.white,
    fontFamily: "Cera-Regular",
    fontSize: 16,
    textAlign: "center",
    opacity: 0.7,
  },
  uploadBtnSymbol: {
    color: colors.green,
    fontSize: 32,
  },
  skip: {
    textAlign: "center",
    color: colors.white,
    fontFamily: "Cera-Regular",
    marginTop: "30%",
    fontSize: 16,
    textTransform: "uppercase",
    letterSpacing: 2,
  },
});
export default ImageUpload;
