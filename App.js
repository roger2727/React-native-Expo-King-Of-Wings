import React from "react";
import { StyleSheet, Platform, StatusBar } from "react-native";
import { colors } from "./src/utils/colors";
import AppNavigator from "./src/components/appNavigator/AppNavigator";

export default function App() {
  return <AppNavigator />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignContent: "center",
    justifyContent: "center",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: colors.primary,
  },
});
