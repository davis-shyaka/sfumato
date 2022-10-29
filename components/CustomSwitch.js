import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import colors from "../assets/colors/colors";

export default function CustomSwitch({
  selectionMode,
  option1,
  option2,
  onSelectSwitch,
}) {
  const [getSelectionMode, setSelectionMode] = useState(selectionMode);

  const updateSwitchData = (value) => {
    setSelectionMode(value);
    onSelectSwitch(value);
  };

  return (
    <View
      style={{
        padding: 25,
      }}
    >
      <View
        style={{
          height: 50,
          width: "100%",
          backgroundColor: colors.dark2,
          borderRadius: 30,
          flexDirection: "row",
          justifyContent: "center",
          borderColor: colors.cyan,
          borderWidth: 0.4,
          padding: 5,
        }}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => updateSwitchData(1)}
          style={{
            flex: 1,
            backgroundColor: getSelectionMode == 1 ? colors.cyan : colors.dark,
            borderTopLeftRadius: 20,
            borderBottomLeftRadius: 20,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: getSelectionMode == 1 ? colors.dark : colors.cyan,
              fontSize: 14,
              fontFamily: "Ubuntu-Medium",
            }}
          >
            {option1}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => updateSwitchData(2)}
          style={{
            flex: 1,
            backgroundColor: getSelectionMode == 2 ? colors.cyan : colors.dark,
            borderTopRightRadius: 20,
            borderBottomRightRadius: 20,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: getSelectionMode == 2 ? colors.dark : colors.cyan,
              fontSize: 14,
              fontFamily: "Ubuntu-Medium",
            }}
          >
            {option2}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
