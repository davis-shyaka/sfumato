import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import colors from "../assets/colors/colors";

const BannerSlider = ({ data }) => {
  return (
    <View style={styles.imageSliderWrapper}>
      <Image source={data.image} style={styles.imageSlider} />
    </View>
  );
};

const styles = StyleSheet.create({
  imageSliderWrapper: {
    marginLeft: 30,
    borderColor: colors.yellow,
    borderWidth: 1,
    borderRadius: 20,
  },
  imageSlider: {
    height: 200,
    width: 300,
    borderRadius: 20,
  },
});
export default BannerSlider;
