import React from "react";
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

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

const AddItemsScreen = ({ navigation, route }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  let openImagePickerAsync = async () => {
    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (pickerResult.cancelled === true) {
      return;
    }
    setSelectedImage({ localUri: pickerResult.uri });
  };

  if (selectedImage !== null) {
    return (
      <View style={styles.container}>
        <View
          style={{
            width: 500,
            marginBottom: 20,
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Home2");
            }}
          >
            <MaterialIcons name="cancel" size={40} color={colors.magneta} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("AddItems");
            }}
          >
            <MaterialIcons
              name="check-circle-outline"
              size={40}
              color={colors.green}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.thumbnailWrapper}>
          <Image
            source={{ uri: selectedImage.localUri }}
            style={styles.thumbnail}
          />
        </View>
      </View>
    );
  }
  return (
    <SafeAreaView style={styles.appWrapper}>
      <View style={styles.containerWrapper}>
        <ImageBackground source={image} style={styles.backgroundImage}>
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
                  onPress={openImagePickerAsync}
                  style={styles.imageButton}
                >
                  <View style={styles.iconWrapper}>
                    <Feather name="upload" size={24} color={colors.yellow} />
                  </View>
                  <Text style={styles.imageButtonText}>Pick a photo</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.inputWrapper}>
                <View style={styles.inputBar}>
                  <TextInput
                    style={styles.inputText}
                    placeholder="Title..."
                    placeholderTextColor={colors.green}
                  />
                </View>
              </View>
              <View style={styles.inputWrapper}>
                <View style={styles.inputBar}>
                  <TextInput
                    style={styles.inputText}
                    placeholder="Artist..."
                    placeholderTextColor={colors.green}
                  />
                </View>
              </View>
              <View style={styles.inputWrapper}>
                <View style={styles.inputBar}>
                  <TextInput
                    style={styles.inputText}
                    placeholder="Category..."
                    placeholderTextColor={colors.green}
                  />
                </View>
              </View>
              <View style={styles.inputWrapper}>
                <View style={styles.inputBar}>
                  <TextInput
                    style={styles.inputText}
                    placeholder="Price..."
                    placeholderTextColor={colors.green}
                  />
                </View>
              </View>
              <View style={styles.inputWrapper}>
                <View style={styles.inputBar}>
                  <TextInput
                    style={styles.inputText}
                    placeholder="email..."
                    placeholderTextColor={colors.green}
                  />
                </View>
              </View>
            </ScrollView>
          </View>
        </View>

        <TouchableOpacity
          style={styles.buttonWrapper}
          onPress={() =>
            alert("Tuza mwana.\nThis functionality is not yet prepared")
          }
        >
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
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
export default AddItemsScreen;
