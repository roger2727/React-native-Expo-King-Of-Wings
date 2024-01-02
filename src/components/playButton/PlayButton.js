import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { colors } from "../../utils/colors";

export const PlayButton = ({
  style = {},
  textStyle = {},
  size = 125,
  disabled = false,
  title,
  onPress,
  ...props
}) => {
  return (
    <TouchableOpacity
      style={[styles(size).radius, { opacity: disabled ? 0.2 : 1 }, style]}
      onPress={!disabled ? onPress : null}
      {...props}
    >
      <Text  style={[styles(size).text, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = (size) => ({
  radius: {
    borderRadius: size / 2,
    width: size,
    height: size,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  
    borderColor: colors.white,
    borderWidth: 4,
    backgroundColor: colors.primary,
  },
  text: { color: colors.white, fontSize: size / 5,alignItems: "center", justifyContent: "center", textAlign: "center", },
});
