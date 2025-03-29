import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  Image,
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { HorizontalLine } from "@/components/ui/HorizontalLine";
import { signInWithGoogle, signUp } from "@/features/Profile/auth";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const scrollViewRef = useRef<ScrollView>(null);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");

  const router = useRouter();

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      (event) => {
        setKeyboardHeight(event.endCoordinates.height);
        setTimeout(() => {
          scrollViewRef.current?.scrollToEnd({ animated: true });
        }, 100);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardHeight(0);
      },
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const handleCreateAndLogin = async () => {
    const { user, error } = await signUp(email, password);
    if (user) {
      router.push("/menu");
    } else if (error) {
      const displayError = error?.message || "Unknown error occurred";
      setErrorMsg("Create Account Error: " + displayError);
    }
  };

  const handleLoginWithGoogle = async () => {
    const { error, user } = await signInWithGoogle();
    if (user) {
      router.push("/menu");
    } else {
      const displayError = error?.message || "Unknown error occurred";
      setErrorMsg("Login with Google Error: " + displayError);
    }
  };

  return (
    <ScrollView
      ref={scrollViewRef}
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.title}>Quick Log In</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleLoginWithGoogle()}
      >
        <Image
          source={require("@/assets/icons/google.png")}
          style={{ width: 20, height: 20 }}
        />
        <Text style={styles.buttonText}>Login with Google</Text>
      </TouchableOpacity>
      <View style={styles.lineContainer}>
        <HorizontalLine
          color="#A26F18"
          thickness={2}
          style={{ width: "40%" }}
        />
        <Text style={styles.orText}>Or</Text>
        <HorizontalLine
          color="#A26F18"
          thickness={2}
          style={{ width: "40%" }}
        />
      </View>
      <Text style={styles.createAccountText}>Create An Account</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity
        style={[styles.button, styles.createAndLoginButton]}
        onPress={() => handleCreateAndLogin()}
      >
        <Text style={styles.createAndLoginButtonText}>CREATE AND LOGIN</Text>
      </TouchableOpacity>
      <View style={{ flexDirection: "row", gap: 10 }}>
        <Text>Already have an account?</Text>
        <TouchableOpacity onPress={() => router.push("/login")}>
          <Text style={styles.loginHereText}>LOGIN HERE</Text>
        </TouchableOpacity>
      </View>
      <View style={{ height: keyboardHeight }} />
      {errorMsg && <Text style={styles.errorMsg}>{errorMsg}</Text>}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
    paddingTop: 100,
    gap: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    alignSelf: "flex-start",
    marginBottom: 20,
  },
  button: {
    width: "100%",
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#C7C7C7",
    flexDirection: "row",
    gap: 10,
  },
  buttonText: {
    fontSize: 16,
    color: "#616161",
  },
  lineContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    marginTop: 20,
  },
  orText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#A26F18",
  },
  createAccountText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    alignSelf: "flex-start",
  },
  input: {
    width: "100%",
    height: 45,
    borderRadius: 14,
    backgroundColor: "#E5E5E5",
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  createAndLoginButton: {
    backgroundColor: "#CEC7BB",
  },
  createAndLoginButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  loginHereText: {
    textDecorationLine: "underline",
    fontWeight: "bold",
  },
  errorMsg: {
    color: "red",
    fontSize: 16,
  },
});

export default SignUp;
