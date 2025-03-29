import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import SimpleScrollView from "@/components/SimpleScrollView";
import { signOut } from "@/features/Profile/auth";
import { setUser } from "@/features/Profile/profileSlice";

import { RootState } from "../store";

export default function TabProfileScreen() {
  const user = useSelector((state: RootState) => state.profile.user);
  const dispatch = useDispatch();
  const router = useRouter();
  const displayUserName = user?.name || "Anonymous Foodie";

  const handleLogout = async () => {
    await signOut();
    dispatch(setUser(null));
    router.replace("/sign-up");
  };

  return (
    <SimpleScrollView style={styles.container}>
      <View style={styles.userInfo}>
        <Text style={styles.userNameText}>{displayUserName}</Text>
        <Text style={styles.userEmailText}>{user?.email}</Text>
      </View>
      <TouchableOpacity onPress={() => handleLogout()}>
        <Text style={styles.logoutText}>LOGOUT</Text>
      </TouchableOpacity>
    </SimpleScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
    padding: 40,
    paddingTop: 100,
    gap: 20,
    backgroundColor: "#EDE7DB",
    height: "100%",
  },
  userInfo: {
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 10,
    backgroundColor: "#575757",
    width: "100%",
    padding: 30,
    borderRadius: 21,
  },
  userNameText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffffff",
  },
  userEmailText: {
    fontSize: 16,
    color: "#ffffff",
  },
  logoutText: {
    fontSize: 16,
    textDecorationLine: "underline",
    fontWeight: "bold",
  },
});
