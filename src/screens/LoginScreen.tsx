// src/screens/LoginScreen.tsx
import RowLink from "@/components/shared/RowLink";
import Colors from "@/theme/colors";
import Spacing from "@/theme/spacing";
import Typography from "@/theme/typography";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
} from "react-native";
import { TextInput } from "react-native-paper";
import CustomButton from "../components/shared/Button";
import Header from "../components/shared/Header";
import InlineMessage from "../components/shared/InlineMessage";

const LoginScreen: React.FC = () => {
  const navigation = useNavigation();

  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"error" | "success">("error");

  const handleLogin = () => {
    setMessage("");

    if (!phone.trim()) {
      setMessage("Phone number is required");
      setMessageType("error");
      return;
    }
    if (!/^\d{10}$/.test(phone.trim())) {
      setMessage("Enter a valid 10-digit phone number");
      setMessageType("error");
      return;
    }
    if (!password.trim()) {
      setMessage("Password is required");
      setMessageType("error");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);

      if (phone === "1234567890" && password === "password") {
        setMessage("Login successful!");
        setMessageType("success");

        setTimeout(() => {
          navigation.navigate("Home" as never);
        }, 1000);
      } else {
        setMessage("Invalid phone number or password");
        setMessageType("error");
      }
    }, 1500);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
        onScrollBeginDrag={Keyboard.dismiss}
      >
        <Header
          title="Welcome Back 👋"
          subtitle="Login with your phone number"
          align="center"
        />

        {/* Phone Input */}
        <TextInput
          mode="flat"
          label="Phone Number"
          keyboardType="phone-pad"
          underlineColor={Colors.black}
          activeUnderlineColor={Colors.primary}
          style={[styles.input, { backgroundColor: Colors.white }]}
          left={<TextInput.Affix text="+91 " />}
          value={phone}
          onChangeText={setPhone}
        />

        {/* Password Input */}
        <TextInput
          mode="flat"
          label="Password"
          placeholder="Enter your password"
          secureTextEntry={!showPassword}
          activeUnderlineColor={Colors.primary}
          style={[styles.input, { backgroundColor: Colors.white }]}
          value={password}
          onChangeText={setPassword}
          right={
            <TextInput.Icon
              icon={showPassword ? "eye-off" : "eye"}
              onPress={() => setShowPassword(!showPassword)}
            />
          }
        />

        {/* Login Button */}
        <CustomButton
          title="Login"
          onPress={handleLogin}
          loading={loading}
          disabled={!phone.trim() || !password.trim() || loading}
        />

        {/* Inline Message */}
        {message && <InlineMessage message={message} type={messageType} />}

        {/* Bottom Links */}
        <RowLink
          leftLabel="Forgot Password?"
          leftHighlight={true}
          onLeftPress={() => navigation.navigate("ForgotPassword" as never)}
          rightLabel="Sign Up"
          rightHighlight={true}
          onRightPress={() => navigation.navigate("SignUp" as never)}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    backgroundColor: Colors.secondary,
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.lg,
  },
  input: {
    marginVertical: Spacing.sm,
    fontSize: Typography.FontSize.body,
  },
});
