// src/screens/SignUpScreen.tsx

import RowLink from "@/components/shared/RowLink";
import Colors from "@/theme/colors";
import Spacing from "@/theme/spacing";
import Typography from "@/theme/typography";

import { useNavigation } from "@react-navigation/native";
import { useState } from "react";

import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

import { TextInput } from "react-native-paper";

import CustomButton from "../components/shared/Button";
import Header from "../components/shared/Header";
import InlineMessage from "../components/shared/InlineMessage";
import Loader from "../components/shared/Loader";

// Firebase
import { createUserInDB } from "@/services/firebase/userService";
import { v4 as uuidv4 } from "uuid";

const SignUpScreen: React.FC = () => {
  const navigation = useNavigation();

  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"error" | "success">("error");

  const handleSignUp = async () => {
    setMessage("");

    // VALIDATIONS
    if (!username.trim()) {
      setMessage("Username is required");
      setMessageType("error");
      return;
    }

    if (username.trim().length < 8) {
      setMessage("Username must be at least 8 characters");
      setMessageType("error");
      return;
    }

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

    if (!email.trim()) {
      setMessage("Email is required");
      setMessageType("error");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email.trim())) {
      setMessage("Enter a valid email");
      setMessageType("error");
      return;
    }

    if (!password.trim()) {
      setMessage("Password is required");
      setMessageType("error");
      return;
    }

    if (password.length < 8) {
      setMessage("Password must be at least 8 characters");
      setMessageType("error");
      return;
    }

    // SAVE TO FIREBASE
    try {
      setLoading(true);

      const uid = uuidv4(); // unique user id

      await createUserInDB(uid, {
        uid,
        username,
        phone,
        email,
        createdAt: Date.now(),
      });

      setMessage("Account created successfully!");
      setMessageType("success");

      setTimeout(() => {
        navigation.navigate("Login" as never);
      }, 1200);
    } catch (error) {
      setMessage("Error creating account. Try again.");
      setMessageType("error");
    }

    setLoading(false);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.centerContainer}
      >
        <View>
          <Header
            title="Create Account ✨"
            subtitle="Sign up to get started"
            align="center"
          />

          <TextInput
            mode="flat"
            label="Username"
            underlineColor={Colors.black}
            activeUnderlineColor={Colors.primary}
            style={[styles.input, { backgroundColor: Colors.white }]}
            value={username}
            onChangeText={setUsername}
          />

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

          <TextInput
            mode="flat"
            label="Email"
            keyboardType="email-address"
            underlineColor={Colors.black}
            activeUnderlineColor={Colors.primary}
            style={[styles.input, { backgroundColor: Colors.white }]}
            value={email}
            onChangeText={setEmail}
          />

          <TextInput
            mode="flat"
            label="Password"
            secureTextEntry={!showPassword}
            underlineColor={Colors.black}
            activeUnderlineColor={Colors.primary}
            style={[styles.input, { backgroundColor: Colors.white }]}
            value={password}
            onChangeText={setPassword}
            right={
              password.length > 0 ? (
                <TextInput.Icon
                  icon={showPassword ? "eye-off" : "eye"}
                  onPress={() => setShowPassword(!showPassword)}
                />
              ) : null
            }
          />

          <CustomButton
            title="Sign Up"
            onPress={handleSignUp}
            loading={loading}
            disabled={!username || !phone || !email || !password}
          />

          {message && <InlineMessage message={message} type={messageType} />}

          <RowLink
            center
            leftLabel="Already have an account?"
            leftHighlight={false}
            rightLabel="Login"
            rightHighlight={true}
            onRightPress={() => navigation.navigate("Login" as never)}
          />

          {loading && <Loader />}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  centerContainer: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
  },
  input: {
    marginVertical: Spacing.sm,
    fontSize: Typography.FontSize.body,
  },
});
