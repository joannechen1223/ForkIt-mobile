import auth from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

import store from "@/app/store";

import { setUser, User } from "./profileSlice";

GoogleSignin.configure({
  webClientId: process.env.FIREBASE_WEB_CLIENT_ID,
});

export async function signIn(
  email: string,
  password: string,
): Promise<{ user: User | null; error: Error | null }> {
  let user: User | null = null;
  let error: Error | null = null;
  await auth()
    .signInWithEmailAndPassword(email, password)
    .then((userInfo) => {
      console.log("User signed in!");
      user = {
        id: userInfo.user.uid,
        email: email,
        name: userInfo.user.displayName || null,
      };
      store.dispatch(setUser(user));
    })
    .catch((err) => {
      console.error(err);
      error = err;
    });
  return { user, error };
}

export async function signUp(
  email: string,
  password: string,
): Promise<{ user: User | null; error: Error | null }> {
  let user: User | null = null;
  let error: Error | null = null;
  await auth()
    .createUserWithEmailAndPassword(email, password)
    .then((userInfo) => {
      console.log("User account created & signed in!");
      user = {
        id: userInfo.user.uid,
        email: email,
        name: userInfo.user.displayName || null,
      };
      store.dispatch(setUser(user));
    })
    .catch((err) => {
      if (err.code === "auth/email-already-in-use") {
        console.log("That email address is already in use!");
      }

      if (err.code === "auth/invalid-email") {
        console.log("That email address is invalid!");
      }

      console.error(err);
      error = err;
    });
  return { user, error };
}

export async function signOut() {
  return auth().signOut();
}

export async function signInWithGoogle(): Promise<{
  user: User | null;
  error: Error | null;
}> {
  let user: User | null = null;
  let error: Error | null = null;
  try {
    const { data } = await GoogleSignin.signIn();
    if (!data?.idToken) {
      throw new Error("No idToken");
    }
    user = {
      id: data.user.id,
      email: data.user.email,
      name: data.user.name,
    };
    const googleCredential = auth.GoogleAuthProvider.credential(data.idToken);
    await auth().signInWithCredential(googleCredential);
    store.dispatch(setUser(user));
  } catch (err) {
    console.error(err);
    error = err as Error;
  }
  return { user, error };
}
