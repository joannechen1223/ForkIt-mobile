import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { signIn } from "@/features/Profile/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const { user, error } = await signIn(email, password);
      if (user) {
        router.push("/menu");
      } else if (error) {
        console.error(error);
      } else {
        console.error("Unknown error");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.backButtonContainer}>
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialIcons name="chevron-left" size={30} />
        </TouchableOpacity>
      </View>
      <View style={styles.welcomeBackContainer}>
        <Text style={styles.welcomeBackText}>WELCOME BACK</Text>
      </View>
      <View style={styles.loginTextContainer}>
        <Text style={styles.loginText}>Log In to your Account</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => setShowPassword(!showPassword)}
        >
          <MaterialIcons
            name={showPassword ? "visibility-off" : "visibility"}
            size={24}
            color="#616161"
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.forgotPasswordContainer}>
        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.loginButton]}
        onPress={() => handleLogin()}
      >
        <Text style={styles.loginButtonText}>LOGIN</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
    paddingTop: 80,
    gap: 10,
  },
  backButtonContainer: {
    width: "100%",
    alignItems: "flex-start",
    marginBottom: 100,
  },
  backButton: {
    fontSize: 16,
    color: "#616161",
  },
  welcomeBackContainer: {
    width: "100%",
    alignItems: "flex-start",
  },
  welcomeBackText: {
    fontSize: 16,
    color: "#616161",
  },
  loginTextContainer: {
    width: "100%",
    alignItems: "flex-start",
  },
  loginText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 40,
    alignSelf: "flex-start",
  },
  inputContainer: {
    width: "100%",
    position: "relative",
    marginBottom: 10,
  },
  input: {
    width: "100%",
    height: 45,
    borderRadius: 14,
    backgroundColor: "#E5E5E5",
    paddingHorizontal: 15,
  },
  iconButton: {
    position: "absolute",
    right: 15,
    top: 10,
    height: 24,
    width: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  forgotPasswordContainer: {
    width: "100%",
    alignItems: "flex-end",
    marginBottom: 10,
  },
  forgotPasswordText: {
    fontSize: 12,
    color: "#000",
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
  loginButton: {
    backgroundColor: "#CEC7BB",
  },
  loginButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default Login;
