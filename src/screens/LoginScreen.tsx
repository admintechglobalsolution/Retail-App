import RowLink from "@/components/shared/RowLink";
import Colors from "@/theme/colors";
import Spacing from "@/theme/spacing";
import Typography from "@/theme/typography";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
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

// Firebase
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

// Helper to convert phone to Firebase-compatible email
const phoneToEmail = (phone: string) => `${phone}@example.com`;

const LoginScreen: React.FC = () => {
  const navigation = useNavigation();

  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"error" | "success">("error");

  const setError = (msg: string) => {
    setMessage(msg);
    setMessageType("error");
  };

  const handleLogin = async () => {
    setMessage("");

    if (!phone.trim()) return setError("Phone number is required");
    if (!/^\d{10}$/.test(phone.trim()))
      return setError("Enter a valid 10-digit phone number");
    if (!password.trim()) return setError("Password is required");

    try {
      setLoading(true);
      const auth = getAuth();
      const email = phoneToEmail(phone.trim());
      await signInWithEmailAndPassword(auth, email, password);

      setMessage("Successfully logged in!");
      setMessageType("success");

      setTimeout(() => {
        navigation.navigate("Home" as never);
      }, 800);
    } catch (error: any) {
      // Simplified error message
      setError("Invalid credentials, try again");
      setPassword(""); // Reset password field
    } finally {
      setLoading(false);
    }
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
          maxLength={10}
        />

        <TextInput
          mode="flat"
          label="Password"
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

        <CustomButton
          title="Login"
          onPress={handleLogin}
          loading={loading}
          disabled={!phone.trim() || !password.trim() || loading}
        />

        {message && <InlineMessage message={message} type={messageType} />}

        <RowLink
          leftLabel="Forgot Password?"
          leftHighlight
          onLeftPress={() => navigation.navigate("ForgotPassword" as never)}
          rightLabel="Sign Up"
          rightHighlight
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
  input: { marginVertical: Spacing.sm, fontSize: Typography.FontSize.body },
});
