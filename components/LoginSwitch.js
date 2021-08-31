import React from "react";
import { StyleSheet, View } from "react-native";
import SwitchSelector from "react-native-switch-selector";
import { backgroundDark, backgroundLight, transparent } from "../styles/colors";

const LoginSwitch = ({ setOption }) => {
  const handleSwitch = (value) => setOption(value);
  const options = [{ label: "Login", value: "LOGIN" }, { label: "Register", value: "REGISTER" }];

  return (
    <View style={styles.container}>
      <SwitchSelector
        onPress={handleSwitch}
        options={options}
        initial={0}
        textColor={"#FFFFFF"}
        selectedColor={"#FFFFFF"}
        buttonColor={transparent}
        backgroundColor={backgroundDark}
        borderColor={backgroundLight}
        hasPadding
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
})

export default LoginSwitch;
