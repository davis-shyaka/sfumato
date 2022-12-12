import React, { useContext } from "react";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
  ScrollView,
} from "react-native";
import colors from "../assets/colors/colors";
import Entypo from "react-native-vector-icons/Entypo";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput } from "react-native-gesture-handler";
import image from "../assets/images/gallery/paid/untitled.jpg";
import { AuthContext } from "../context/AuthContext";
import client from "../api/client";
import { StackActions } from "@react-navigation/native";
import { Formik } from "formik";
import * as Yup from "yup";
import AppLoader from "../components/AppLoader";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

const UpdateItemsScreen = ({ navigation, route }) => {
  // {profileImage} ? source={uri: profileImage }
  //                : source={image}}
  console.log("From the art details - params: ", route.params);
  const { isLoading, setIsLoading } = useContext(AuthContext);
  const itemInfo = {
    avatar: "",
    title: "",
    artist: "",
    email: "",
    category: "",
    price: "",
    size: "",
    isFree: null,
  };

  const CreateItemSchema = Yup.object({
    title: Yup.string()
      .trim()
      .min(3, "Too short!")
      .required("Title is required"),
    artist: Yup.string()
      .trim()
      .min(3, "Too short!")
      .required("Artist is required"),
    email: Yup.string().email("Invalid Email").required("Email is required"),
    category: Yup.string()
      .trim()
      .min(3, "Category name is too short")
      .required("Category is required!"),
    price: Yup.number().required("Price is required!"),
    size: Yup.string().trim().required("Size description is required!"),
    // avatar: Yup.string().trim().required("Image is required"),
  });

  const UpdateItem = async (values, formikActions) => {
    setIsLoading(true);
    const res = await client.patch(`/items/update/${route.params.id}`, {
      ...values,
    });

    console.log(res.data);
    if (res.data.success) {
      try {
        if (res.data.success) {
          try {
            navigation.navigate("Featured2");
          } catch (error) {
            console.log("Error tring to redirect: ", error.message);
          }
        }
      } catch (error) {
        console.log("Error while creating item: ", error.message);
      }
    }
    formikActions.resetForm();
    formikActions.setSubmitting(false);
    setIsLoading(false);
  };

  // handle image upload
  const [profileImage, setProfileImage] = useState(null);

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
        // aspect: [10, 10],
        quality: 1,
      });

      // console.log(response);
      // console.log(response.uri);

      if (!response.cancelled) {
        setProfileImage(response.uri);
      }
    }
  };
  return (
    <>
      <ScrollView>
        <Formik
          initialValues={itemInfo}
          validationSchema={CreateItemSchema}
          onSubmit={UpdateItem}
          // validateOnChange={false} // disable on every keystroke
        >
          {({
            values,
            errors,
            touched,
            isSubmitting,
            handleChange,
            handleBlur,
            handleSubmit,
          }) => {
            // console.log(values);
            const { title, artist, email, category, price, size } = values;
            return (
              <>
                <View style={styles.appWrapper}>
                  <View style={styles.containerWrapper}>
                    {errors.avatar ? (
                      <Text
                        style={{
                          color: colors.magneta,
                          alignSelf: "flex-start",
                          marginLeft: "10%",
                          marginBottom: "5%",
                        }}
                      >
                        {errors.avatar}
                      </Text>
                    ) : null}
                    <ImageBackground
                      source={{
                        uri: profileImage,
                      }}
                      style={styles.backgroundImage}
                      value={profileImage}
                    >
                      <TouchableOpacity
                        style={styles.backIcon}
                        onPress={() => navigation.goBack()}
                      >
                        <FontAwesome
                          name="chevron-circle-left"
                          size={32}
                          color={colors.cyan}
                        />
                      </TouchableOpacity>
                    </ImageBackground>

                    <View style={styles.descriptionWrapper}>
                      <View style={styles.descriptionTextWrapper}>
                        <Text style={styles.descriptionTitle}>Description</Text>
                        <ScrollView>
                          <View style={styles.imageButtonWrapper}>
                            <TouchableOpacity
                              onPress={openImageLibrary}
                              style={styles.imageButton}
                            >
                              <View style={styles.iconWrapper}>
                                <Feather
                                  name="upload"
                                  size={24}
                                  color={colors.yellow}
                                />
                              </View>
                              <Text style={styles.imageButtonText}>
                                Pick a photo
                              </Text>
                            </TouchableOpacity>
                          </View>
                          <View style={styles.inputWrapper}>
                            {errors.title ? (
                              <Text
                                style={{
                                  color: colors.magneta,
                                  alignSelf: "flex-start",
                                  marginLeft: "10%",
                                  marginBottom: "5%",
                                }}
                              >
                                {errors.title}
                              </Text>
                            ) : null}
                            <View style={styles.inputBar}>
                              <TextInput
                                style={styles.inputText}
                                placeholder={route.params.title}
                                placeholderTextColor={colors.green}
                                value={title}
                                errors={touched.title && errors.title}
                                onChangeText={handleChange("title")}
                                onBlur={handleBlur("title")}
                              />
                            </View>
                          </View>
                          <View style={styles.inputWrapper}>
                            {errors.artist ? (
                              <Text
                                style={{
                                  color: colors.magneta,
                                  alignSelf: "flex-start",
                                  marginLeft: "10%",
                                  marginBottom: "5%",
                                }}
                              >
                                {errors.artist}
                              </Text>
                            ) : null}
                            <View style={styles.inputBar}>
                              <TextInput
                                style={styles.inputText}
                                placeholder={route.params.artist}
                                placeholderTextColor={colors.green}
                                value={artist}
                                errors={touched.artist && errors.artist}
                                onChangeText={handleChange("artist")}
                                onBlur={handleBlur("artist")}
                              />
                            </View>
                          </View>
                          <View style={styles.inputWrapper}>
                            {errors.category ? (
                              <Text
                                style={{
                                  color: colors.magneta,
                                  alignSelf: "flex-start",
                                  marginLeft: "10%",
                                  marginBottom: "5%",
                                }}
                              >
                                {errors.category}
                              </Text>
                            ) : null}
                            <View style={styles.inputBar}>
                              <TextInput
                                style={styles.inputText}
                                placeholder={route.params.category}
                                placeholderTextColor={colors.green}
                                value={category}
                                errors={touched.category && errors.category}
                                onChangeText={handleChange("category")}
                                onBlur={handleBlur("category")}
                              />
                            </View>
                          </View>
                          <View style={styles.inputWrapper}>
                            {errors.price ? (
                              <Text
                                style={{
                                  color: colors.magneta,
                                  alignSelf: "flex-start",
                                  marginLeft: "10%",
                                  marginBottom: "5%",
                                }}
                              >
                                {errors.price}
                              </Text>
                            ) : null}
                            <View style={styles.inputBar}>
                              <TextInput
                                style={styles.inputText}
                                placeholder={route.params.price}
                                placeholderTextColor={colors.green}
                                value={price}
                                errors={touched.price && errors.price}
                                onChangeText={handleChange("price")}
                                onBlur={handleBlur("price")}
                                keyboardType="decimal-pad"
                              />
                            </View>
                          </View>
                          <View style={styles.inputWrapper}>
                            {errors.size ? (
                              <Text
                                style={{
                                  color: colors.magneta,
                                  alignSelf: "flex-start",
                                  marginLeft: "10%",
                                  marginBottom: "5%",
                                }}
                              >
                                {errors.size}
                              </Text>
                            ) : null}
                            <View style={styles.inputBar}>
                              <TextInput
                                style={styles.inputText}
                                placeholder={route.params.size}
                                placeholderTextColor={colors.green}
                                value={size}
                                errors={touched.size && errors.size}
                                onChangeText={handleChange("size")}
                                onBlur={handleBlur("size")}
                              />
                            </View>
                          </View>
                          <View style={styles.inputWrapper}>
                            {errors.email ? (
                              <Text
                                style={{
                                  color: colors.magneta,
                                  alignSelf: "flex-start",
                                  marginLeft: "10%",
                                  marginBottom: "5%",
                                }}
                              >
                                {errors.email}
                              </Text>
                            ) : null}
                            <View style={styles.inputBar}>
                              <TextInput
                                style={styles.inputText}
                                placeholder={route.params.email}
                                placeholderTextColor={colors.green}
                                value={email}
                                errors={touched.email && errors.email}
                                onChangeText={handleChange("email")}
                                onBlur={handleBlur("email")}
                                autoCapitalize="none"
                                keyboardType="email-address"
                              />
                            </View>
                          </View>
                        </ScrollView>
                      </View>
                    </View>

                    <TouchableOpacity
                      onPress={!isSubmitting ? handleSubmit : null}
                      disabled={isSubmitting}
                      style={[
                        styles.buttonWrapper,
                        { opacity: isSubmitting ? 0.4 : 1 },
                      ]}
                    >
                      <Text style={styles.buttonText}>Update</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </>
            );
          }}
        </Formik>
      </ScrollView>
      {isLoading ? <AppLoader /> : null}
    </>
  );
};

const styles = StyleSheet.create({
  appWrapper: {
    flex: 1,
    backgroundColor: colors.dark2,
    marginTop: 20,
  },
  containerWrapper: {
    flex: 1,
    backgroundColor: colors.dark2,
  },
  backgroundImage: {
    height: height * 0.55,
    borderRadius: 50,
  },
  imageButtonWrapper: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    width: "50%",
  },
  imageButton: {
    backgroundColor: colors.white,
    padding: 5,
    borderRadius: 50,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  iconWrapper: {
    backgroundColor: colors.dark2,
    borderRadius: 100,
    padding: 5,
  },
  imageButtonText: {
    fontFamily: "Cera-Light",
    fontSize: 14,
    color: colors.dark2,
  },
  container: {
    flex: 1,
    backgroundColor: colors.dark2,
    alignItems: "center",
    justifyContent: "center",
    marginTop: "5%",
  },
  thumbnailWrapper: {
    backgroundColor: colors.dark,
    justifyContent: "center",
    alignItems: "center",
    width: 400,
    height: 500,
    borderRadius: 50,
  },
  thumbnail: {
    width: 500,
    height: 500,
    resizeMode: "contain",
  },
  descriptionWrapper: {
    flex: 1,
    backgroundColor: colors.dark2,
    marginTop: -130,
    borderRadius: 25,
    paddingHorizontal: 10,
  },
  backIcon: {
    marginLeft: 20,
    marginTop: 40,
  },
  inputWrapper: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  inputBar: {
    flexDirection: "row",
    borderColor: colors.cyan,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
  searchIcon: {
    margin: 10,
  },
  inputText: {
    color: colors.white,
  },
  descriptionTextWrapper: {
    marginTop: 20,
    marginHorizontal: 20,
  },
  descriptionTitle: {
    fontFamily: "Cera-Medium",
    fontSize: 18,
    color: colors.cyan,
  },
  descriptionSection: {},
  descriptionText: {
    marginTop: 20,
    fontFamily: "Cera-Regular",
    fontSize: 16,
    color: colors.white,
  },
  buttonWrapper: {
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: colors.green,
    alignItems: "center",
    paddingVertical: 10,
    borderRadius: 10,
  },
  buttonText: {
    fontFamily: "Cera-Bold",
    fontSize: 18,
    color: colors.yellow,
  },
});
export default UpdateItemsScreen;
