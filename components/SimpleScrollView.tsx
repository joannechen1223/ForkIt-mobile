import React, { ReactNode } from "react";
import { ScrollView, StyleSheet } from "react-native";

export default function SimpleScrollView({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <ScrollView contentContainerStyle={styles.container}>{children}</ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 80,
    alignItems: "center",
  },
});
