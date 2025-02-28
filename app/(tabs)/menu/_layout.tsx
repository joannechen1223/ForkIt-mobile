import { Stack } from "expo-router";

export default function MenuLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* Default Menu List */}
      <Stack.Screen name="index" options={{ title: "Menu" }} />

      {/* Menu Item Detail Page - NOT in Tabs, but Tab Bar Stays */}
      <Stack.Screen name="[id]" options={{ title: "Menu Item" }} />
    </Stack>
  );
}
