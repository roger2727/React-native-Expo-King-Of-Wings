import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { colors } from "../../utils/colors";

export const AddPlayerButton = ({
  style = {},
  textStyle = {},
  size = 125,
  ...props
}) => {
  return (
    <TouchableOpacity
      style={[styles(size).radius, style]}
      onPress={props.onPress}
    >
      <Text style={[styles(size).text, textStyle]}>{props.title}</Text>
    </TouchableOpacity>
  );
};

const styles = (size) => ({
  radius: {
    borderRadius: size / 5,
    width: size,
    height: size,
    alignItems: "center",
    justifyContent: "center",
    borderColor: colors.white,
    borderWidth: 4,
    backgroundColor: colors.primary,
  },
  text: { color: colors.white, fontSize: size / 2 },
});