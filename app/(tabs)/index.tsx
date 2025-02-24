import { Text, View } from "react-native";

import SimpleScrollView from "@/components/SimpleScrollView";
import TopBar from "@/components/TopBar";

export default function TabCameraScreen() {
  return (
    <View style={{ flex: 1 }}>
      <TopBar />
      <View style={{ flex: 1, marginTop: 60 }}>
        <SimpleScrollView>
          <Text>Camera Screen</Text>
        </SimpleScrollView>
      </View>
    </View>
  );
}
