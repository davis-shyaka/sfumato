import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import colors from "../assets/colors/colors";
import Feather from "react-native-vector-icons/Feather";
import { windowWidth } from "../utils/Dimensions";

const ListItem = ({ photo, title, subTitle, isFree, price, artist }) => {
  return (
    <View style={styles.listItemWrapper}>
      <View style={styles.listItemImageWrapper}>
        <Image style={styles.listItemImage} source={photo} />
      </View>

      <View style={{ width: windowWidth - 220 }}>
        <Text numberOfLines={1} style={styles.listItemArtist}>
          {title}
        </Text>
        <Text style={styles.listItemCategory}>{subTitle}</Text>
      </View>

      <View>
        <TouchableOpacity style={styles.listItemButton}>
          {isFree == "Yes" && (
            <Feather name="download" size={20} color={colors.cyan} />
          )}
          <Text style={{ color: colors.cyan }}>
            {/* {isFree == "Yes" && "Download"} */}
            {isFree == "No" && price}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  listItemWrapper: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 20,
    paddingVertical: 10,
  },
  listItemImageWrapper: {
    borderColor: colors.yellow,
    borderWidth: 1,
    borderRadius: 20,
    marginRight: 5,
  },
  listItemImage: {
    width: 100,
    height: 100,
    borderRadius: 20,
  },
  listItemCategory: {
    color: colors.green,
    fontFamily: "Cera-Medium",
    fontSize: 12,
  },
  listItemArtist: {
    color: colors.yellow,
    fontFamily: "Cera-Medium",
    fontSize: 18,
    paddingVertical: 5,
  },
  listItemButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: colors.dark,
    padding: 10,
    borderRadius: 10,
    shadowColor: colors.cyan,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});

export default ListItem;
