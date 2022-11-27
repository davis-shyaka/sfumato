import { StyleSheet, Text, View } from "react-native";
import React from "react";
import * as Progress from "react-native-progress";
import colors from "../assets/colors/colors";

const UploadProgress = ({ process }) => {
  return (
    <View style={[StyleSheet.absoluteFillObject, styles.container]}>
      <Progress.Bar progress={process} width={200} color={colors.cyan} />
    </View>
  );
};

export default UploadProgress;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.dark2,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
});
