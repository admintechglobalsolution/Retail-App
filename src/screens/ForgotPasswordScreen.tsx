// FINAL BEST VERSION (Recommended)
import Colors from "@/theme/colors";
import Spacing from "@/theme/spacing";
import Typography from "@/theme/typography";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
} from "react-native";
import { TextInput } from "react-native-paper";
import CustomButton from "../components/shared/Button";
import Header from "../components/shared/Header";
import InlineMessage from "../components/shared/InlineMessage";
import RowLink from "../components/shared/RowLink";

const ForgotPasswordScreen: React.FC = () => {
  const navigation = useNavigation<any>();

  const [phone, setPhone] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"error" | "success">("error");

  // ------------------- SEND OTP -------------------
  const handleSendOTP = () => {
    setMessage("");

    if (!/^\d{10}$/.test(phone.trim())) {
      setMessage("Enter a valid 10-digit phone number");
      setMessageType("error");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOtpSent(true);
      setMessage("OTP sent successfully");
      setMessageType("success");
    }, 1200);
  };

  // ------------------- RESET PASSWORD -------------------
  const handleSubmitNewPassword = () => {
    setMessage("");

    if (!newPassword || !confirmPassword) {
      setMessage("Both password fields are required");
      setMessageType("error");
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match");
      setMessageType("error");
      return;
    }

    if (newPassword.length < 8) {
      setMessage("Password must be at least 8 characters");
      setMessageType("error");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setMessage("Password updated successfully");
      setMessageType("success");

      setTimeout(() => {
        navigation.navigate("Login");
      }, 600);
    }, 1200);
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
      >
        <Header
          title="Forgot Password 🔐"
          subtitle="Verify your phone number with an OTP"
          align="center"
        />

        {/* Step 1: Enter Phone */}
        {!otpSent ? (
          <>
            <TextInput
              mode="flat"
              label="Phone Number"
              keyboardType="phone-pad"
              underlineColor={Colors.black}
              activeUnderlineColor={Colors.primary}
              style={[styles.input, { backgroundColor: Colors.white }]}
              onChangeText={setPhone}
              value={phone}
              left={<TextInput.Affix text="+91 " />}
            />

            <CustomButton
              title="Send OTP"
              onPress={handleSendOTP}
              loading={loading}
              disabled={loading || phone.trim().length !== 10}
            />
          </>
        ) : (
          <>
            {/* Step 2: Enter New Password */}
            <TextInput
              mode="flat"
              label="New Password"
              secureTextEntry={!showNewPassword}
              activeUnderlineColor={Colors.primary}
              style={[styles.input, { backgroundColor: Colors.white }]}
              value={newPassword}
              onChangeText={setNewPassword}
              right={
                <TextInput.Icon
                  icon={showNewPassword ? "eye-off" : "eye"}
                  onPress={() => setShowNewPassword(!showNewPassword)}
                />
              }
            />

            <TextInput
              mode="flat"
              label="Confirm Password"
              secureTextEntry={!showConfirmPassword}
              activeUnderlineColor={Colors.primary}
              style={[styles.input, { backgroundColor: Colors.white }]}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              right={
                <TextInput.Icon
                  icon={showConfirmPassword ? "eye-off" : "eye"}
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                />
              }
            />

            <CustomButton
              title="Submit"
              onPress={handleSubmitNewPassword}
              loading={loading}
              disabled={
                loading ||
                !newPassword ||
                !confirmPassword ||
                newPassword.length < 8
              }
            />
          </>
        )}

        {message && <InlineMessage message={message} type={messageType} />}

        <RowLink
          center
          leftLabel="Already have an account?"
          rightLabel="Login"
          rightHighlight
          onRightPress={() => navigation.navigate("Login")}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    backgroundColor: Colors.secondary,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
  },
  input: {
    marginVertical: Spacing.sm,
    fontSize: Typography.FontSize.body,
  },
});
