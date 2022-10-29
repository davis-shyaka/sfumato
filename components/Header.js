import { View, Text, StyleSheet } from "react-native";
import React from "react";

const Header = (props) => {
  return (
    <View style={styles.headerWrapper}>
      <Text style={styles.headerTitle}>{props.name}</Text>
      <Text>Hello</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerWrapper: {
    marginHorizontal: 20,
  },
  headerTitle: {
    fontFamily: "Ubuntu-Bold",
    fontSize: 32,
  },
});

export default Header;
