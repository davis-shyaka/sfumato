import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";

const BannerSlider = ({ data }) => {
  return (
    <View>
      <Image source={data.image} style={styles.imageSlider} />
    </View>
  );
};

const styles = StyleSheet.create({
  imageSlider: {
    height: 150,
    width: 300,
    borderRadius: 20,
  },
});
export default BannerSlider;
