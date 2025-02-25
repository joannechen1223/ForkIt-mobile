import React from "react";
import { View, StyleSheet } from "react-native";

interface HorizontalLineProps {
  color?: string;
  thickness?: number;
  width?: string | number;
  style?: object;
}

export const HorizontalLine: React.FC<HorizontalLineProps> = ({
  color = "#e0e0e0",
  thickness = 1,
  style = {},
}) => {
  // Original approach for other platforms
  return (
    <View
      style={[
        styles.line,
        {
          backgroundColor: color,
          height: thickness,
        },
        style,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  line: {
    marginVertical: 10,
  },
});
