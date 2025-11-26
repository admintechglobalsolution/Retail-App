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

// Shared Validation
import {
  normalizeEmail,
  normalizeUsername,
  validateEmail,
  validatePassword,
  validatePhone,
  validateUsername,
} from "@/services/validation/validationService";

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

    // VALIDATION USING SHARED SERVICE
    const usernameError = validateUsername(username);
    if (usernameError) {
      setMessage(usernameError);
      setMessageType("error");
      return;
    }

    const phoneError = validatePhone(phone);
    if (phoneError) {
      setMessage(phoneError);
      setMessageType("error");
      return;
    }

    const emailError = validateEmail(email);
    if (emailError) {
      setMessage(emailError);
      setMessageType("error");
      return;
    }

    const passwordError = validatePassword(password);
    if (passwordError) {
      setMessage(passwordError);
      setMessageType("error");
      return;
    }

    // NORMALIZE BEFORE SAVE
    const normalizedUsername = normalizeUsername(username);
    const normalizedEmail = normalizeEmail(email);

    // SAVE TO FIREBASE
    try {
      setLoading(true);

      const uid = uuidv4();

      await createUserInDB(uid, {
        uid,
        username: normalizedUsername, // save in lowercase
        phone,
        email: normalizedEmail, // save in lowercase
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

          {/* USERNAME - auto lowercase */}
          <TextInput
            mode="flat"
            label="Username"
            underlineColor={Colors.black}
            activeUnderlineColor={Colors.primary}
            style={[styles.input, { backgroundColor: Colors.white }]}
            value={username}
            onChangeText={(text) => setUsername(text.toLowerCase())}
            maxLength={15}
          />

          {/* PHONE */}
          <TextInput
            mode="flat"
            label="Phone Number"
            inputMode="numeric"
            keyboardType="phone-pad"
            underlineColor={Colors.black}
            activeUnderlineColor={Colors.primary}
            style={[styles.input, { backgroundColor: Colors.white }]}
            left={<TextInput.Affix text="+91 " />}
            value={phone}
            onChangeText={setPhone}
            maxLength={10}
          />

          {/* EMAIL - auto lowercase */}
          <TextInput
            mode="flat"
            label="Email"
            keyboardType="email-address"
            underlineColor={Colors.black}
            activeUnderlineColor={Colors.primary}
            style={[styles.input, { backgroundColor: Colors.white }]}
            value={email}
            onChangeText={(text) => setEmail(text.toLowerCase())}
          />

          {/* PASSWORD */}
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
    backgroundColor: Colors.secondary,
  },
  input: {
    marginVertical: Spacing.sm,
    fontSize: Typography.FontSize.body,
  },
});
