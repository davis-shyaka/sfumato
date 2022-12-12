import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import colors from "../assets/colors/colors";
import Entypo from "react-native-vector-icons/Entypo";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import client from "../api/client";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import AppLoader from "../components/AppLoader";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

const ArtDetailsScreen = ({ navigation, route }) => {
  const { title } = route.params;
  console.log("Items params:", route.params);
  const { login, isLoading, setIsLoading } = useContext(AuthContext);

  const handleDelete = async (id) => {
    try {
      setIsLoading(true);
      const response = await client.delete(`/item/delete/${id}`);
      if (response.data.success === false) {
        alert(response.data.message);
      }
      if (response.data.success) {
        navigation.goBack();
      }
      setIsLoading(false);
    } catch (error) {
      alert(`Failed to delete item: ${error.message}`);
    }
  };
  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          <ImageBackground
            source={route.params?.photo}
            style={styles.backgroundImage}
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
            <View style={styles.titlesWrapper}>
              <Text style={styles.itemTitle}>{route.params?.title}</Text>
              <View style={styles.artistWrapper}>
                <FontAwesome
                  name="paint-brush"
                  size={20}
                  color={colors.yellow}
                />
                <Text style={[styles.artistText, { marginLeft: 10 }]}>
                  {route.params?.artist}
                </Text>
              </View>
            </View>
          </ImageBackground>

          <View style={styles.descriptionWrapper}>
            <TouchableOpacity>
              <View style={styles.heartWrapper}>
                <Entypo name="heart" size={32} color={colors.magneta} />
              </View>
            </TouchableOpacity>

            <View style={styles.descriptionTextWrapper}>
              <Text style={styles.descriptionTitle}>Description</Text>
              <ScrollView>
                <View style={styles.descriptionSection}>
                  <Text style={styles.descriptionText}>
                    ID: {route.params?.id}
                  </Text>
                  <Text style={styles.descriptionText}>
                    Title: {route.params?.title}
                  </Text>
                  <Text style={styles.descriptionText}>
                    Artist: {route.params?.artist}
                  </Text>
                  <Text style={styles.descriptionText}>
                    Category: {route.params?.subTitle}
                  </Text>
                  <Text style={styles.descriptionText}>
                    Size: {route.params?.size}
                  </Text>
                  <Text style={styles.descriptionText}>
                    Price: {route.params?.price}
                  </Text>
                  <Text style={styles.descriptionText}>
                    Email: {route.params?.email}
                  </Text>
                </View>
              </ScrollView>
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              alignItems: "center",
              paddingHorizontal: "5%",
            }}
          >
            <TouchableOpacity
              style={styles.buttonWrapper}
              onPress={() =>
                alert("Tuza mwana.\nThis functionality is not yet prepared")
              }
            >
              <Text style={styles.buttonText}>Purchase</Text>
            </TouchableOpacity>
            {/* Editing an item */}
            <TouchableOpacity
              style={[styles.buttonWrapper, { backgroundColor: colors.cyan }]}
              onPress={() =>
                navigation.navigate("UpdateItems", {
                  id: route.params.id,
                  title: route.params.title,
                  artist: route.params.artist,
                  email: route.params.email,
                  photo: route.params.poster,
                  subTitle: route.params.category,
                  price: route.params.price,
                  size: route.params.size,
                })
              }
            >
              <Text style={styles.buttonText}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.buttonWrapper,
                { backgroundColor: colors.magneta },
              ]}
              onPress={() => handleDelete(route.params?.id)}
            >
              <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      {isLoading ? <AppLoader /> : null}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.dark2,
    marginTop: "5%",
  },
  backgroundImage: {
    height: height * 0.55,
    justifyContent: "space-between",
    borderRadius: 50,
  },
  descriptionWrapper: {
    flex: 1,
    backgroundColor: colors.dark2,
    marginTop: -20,
    borderRadius: 25,
    paddingHorizontal: 10,
  },
  backIcon: {
    marginLeft: 20,
    marginTop: 40,
  },
  titlesWrapper: {
    marginHorizontal: 20,
    marginBottom: 40,
  },
  itemTitle: {
    fontFamily: "Cera-Bold",
    fontSize: 32,
    color: colors.white,
  },
  artistWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  artistText: {
    fontFamily: "Cera-Bold",
    fontSize: 16,
    color: colors.white,
  },
  heartWrapper: {
    position: "absolute",
    right: 40,
    top: -30,
    width: 64,
    height: 64,
    backgroundColor: colors.dark2,
    borderRadius: 64,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "cyan",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 5,
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
    // fontFamily: "Cera-Regular",
    fontSize: 16,
    color: colors.white,
  },
  buttonWrapper: {
    width: "30%",
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
    color: colors.black,
  },
});
export default ArtDetailsScreen;
