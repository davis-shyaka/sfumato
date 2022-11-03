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

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

const Details = ({ route, navigation }) => {
  const { item } = route.params;
  return (
    <View style={styles.container}>
      <ImageBackground source={item.imageBig} style={styles.backgroundImage}>
        <TouchableOpacity
          style={styles.backIcon}
          onPress={() => navigation.goBack()}
        >
          <Entypo name="chevron-left" size={32} color={colors.cyan} />
        </TouchableOpacity>
        <View style={styles.titlesWrapper}>
          <Text style={styles.itemTitle}>{item.title}</Text>
          <View style={styles.locationWrapper}>
            <Entypo name="location-pin" size={24} color={colors.white} />
            <Text style={styles.locationText}>{item.location}</Text>
          </View>
        </View>
      </ImageBackground>

      <View style={styles.descriptionWrapper}>
        <View style={styles.heartWrapper}>
          <Entypo name="heart" size={32} color={colors.cyan} />
        </View>
        <View style={styles.descriptionTextWrapper}>
          <Text style={styles.descriptionTitle}>Description</Text>
          <ScrollView>
            <Text style={styles.descriptionText}>{item.description}</Text>
          </ScrollView>
        </View>
      </View>

      <View style={styles.infoWrapper}>
        <View style={styles.infoItem}>
          <Text style={styles.infoTitle}>PRICE</Text>
          <View style={styles.infoTextWrapper}>
            <Text style={styles.infoText}>${item.price}</Text>
            <Text style={styles.infoSubText}>/person</Text>
          </View>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoTitle}>RATING</Text>
          <View style={styles.infoTextWrapper}>
            <Text style={styles.infoText}>${item.rating}</Text>
            <Text style={styles.infoSubText}>/5</Text>
          </View>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoTitle}>DURATION</Text>
          <View style={styles.infoTextWrapper}>
            <Text style={styles.infoText}>${item.duration}</Text>
            <Text style={styles.infoSubText}> hours</Text>
          </View>
        </View>
      </View>
      <TouchableOpacity
        style={styles.buttonWrapper}
        onPress={() => alert("You booked a trip!")}
      >
        <Text style={styles.buttonText}>Book Now</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.dark2,
    marginTop: 20,
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
    fontFamily: "Ubuntu-Bold",
    fontSize: 32,
    color: colors.white,
  },
  locationWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  locationText: {
    fontFamily: "Ubuntu-Bold",
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
    fontFamily: "Ubuntu-Bold",
    fontSize: 24,
    color: colors.cyan,
  },
  descriptionText: {
    marginTop: 20,
    fontFamily: "Ubuntu-Regular",
    fontSize: 16,
    color: colors.white,
  },
  infoWrapper: {
    flexDirection: "row",
    marginHorizontal: 20,
    justifyContent: "space-between",
    marginTop: 40,
  },
  infoItem: {},
  infoTitle: {
    fontFamily: "Ubuntu-Bold",
    fontSize: 12,
    color: colors.white,
  },
  infoTextWrapper: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginTop: 5,
  },
  infoText: {
    fontFamily: "Ubuntu-Bold",
    fontSize: 24,
    color: colors.cyan,
  },
  infoSubText: {
    fontFamily: "Ubuntu-Bold",
    fontSize: 14,
    color: colors.gray,
  },
  buttonWrapper: {
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: colors.cyan,
    alignItems: "center",
    paddingVertical: 10,
    borderRadius: 10,
  },
  buttonText: {
    fontFamily: "Ubuntu-Bold",
    fontSize: 18,
    color: colors.dark,
  },
});

export default Details;
