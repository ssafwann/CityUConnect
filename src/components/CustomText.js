import React from "react";
import { Text } from "react-native";

const CustomText = (props) => {
  return (
    <Text style={[styles.text, props.style]} className={props.className}>
      {props.children}
    </Text>
  );
};

const styles = {
  text: {
    fontFamily: "Nexa",
    fontSize: "16px",
    color: "#000",
  },
};

export default CustomText;
